import { JwtModule } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { hashPassword } from 'src/app/config/crypto';
import { AuthService } from 'src/features/auth/application/auth.services';
import { LoginDto } from 'src/features/auth/application/dto';
import { CredentialsNotValidException } from 'src/features/auth/domain/auth.exceptions';
import { User } from 'src/features/users/domain/entities/user.entity';
import { EntityManager } from 'typeorm';

describe('Auth service', () => {
  let authService: AuthService;

  const mockEntityManager = () => ({
    findOne: jest.fn((): Partial<User> => {
      const { hash: password, salt } = hashPassword('password');

      return {
        username: 'username',
        roleId: 'admin',
        password,
        salt,
      };
    }),
  });

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          secret: 'secret',
          signOptions: { expiresIn: '15m' },
        }),
      ],
      providers: [
        AuthService,
        {
          provide: EntityManager,
          useFactory: mockEntityManager,
        },
      ],
    }).compile();

    authService = moduleRef.get<AuthService>(AuthService);
  });

  describe('User Login', () => {
    it('should accept the credentials, then should return an access and refresh token', async () => {
      const loginDto: LoginDto = {
        username: 'username',
        password: 'password',
      };

      expect(await authService.loginUser(loginDto)).toHaveProperty('accessToken');
      expect(await authService.loginUser(loginDto)).toHaveProperty('refreshToken');
    });

    it('should refuse the credentials, then should throw CredentialsNotValidException', async () => {
      const loginDto: LoginDto = {
        username: 'username',
        password: 'wrong-password',
      };

      await expect(authService.loginUser(loginDto)).rejects.toThrowError(CredentialsNotValidException);
    });
  });
});
