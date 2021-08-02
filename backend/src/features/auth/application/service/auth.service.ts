import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { configuration } from 'src/app/config/configuration/configuration';
import { User } from 'src/features/users/domain/entity/user.entity';
import { IUserRepository, Username } from 'src/features/users/domain/repository/user.repository';
import { USER_REPOSITORY } from 'src/features/users/infrastructure/repository/user.repository.provider';
import { Role } from 'src/features/_shared/domain/roles/role.enum';
import { RefreshToken } from '../../domain/auth.types';
import { IAuthRepository } from '../../domain/repository/auth.repository';
import { AUTH_REPOSITORY } from '../../infrastructure/repository/auth.repository.provider';
import { LoginDto } from '../dto';
import { RefreshTokenDto } from '../dto/refresh-token.dto';
import { RegisterDto } from '../dto/register.dto';
import { LoginFailedException, PasswordValidationFailedException, RefreshTokenNotValidException, RegisterFailedException } from '../exceptions/auth.exceptions';

@Injectable({})
export class AuthService {
  constructor(
    @Inject(AUTH_REPOSITORY) private readonly authRepository: IAuthRepository,
    @Inject(USER_REPOSITORY) private readonly userRepository: IUserRepository,
    private readonly jwtService: JwtService,
  ) {}

  private readonly refreshTokens = {};

  async loginUser(loginDto: LoginDto) {
    const { username, password } = loginDto;

    try {
      const user = await this.authRepository.validateUser(username, password);
      return this.getAuthResponse(user);
    } catch {}

    throw new LoginFailedException();
  }

  async registerUser(registerDto: RegisterDto) {
    const { username, password, repeatedPassword, role } = registerDto;

    if (password != repeatedPassword) throw new RegisterFailedException("Passwords doesn't match");

    try {
      const user = await this.userRepository.create({ username, password, roleId: role });
      return this.getAuthResponse(user);
    } catch {}

    throw new RegisterFailedException('Username already exist');
  }

  async createAccessToken({ refreshToken }: RefreshTokenDto) {
    try {
      const decodedRefreshToken = this.jwtService.verify<RefreshToken>(refreshToken);

      const { username, role, exp } = decodedRefreshToken;

      const refreshTokenExpirationTime = exp * 1000;
      const currentTime = new Date().getTime();

      const tokenExist = this.refreshTokens[refreshToken] === username;
      const tokenNotExpired = refreshTokenExpirationTime >= currentTime;

      if (tokenExist && tokenNotExpired) {
        const payload = { username, role };
        const accessToken = this.jwtService.sign(payload);

        return { accessToken };
      }
    } catch {}

    throw new RefreshTokenNotValidException();
  }

  async deleteRefreshToken({ refreshToken }: RefreshTokenDto) {
    const decodedRefreshToken = this.jwtService.verify<RefreshToken>(refreshToken);

    const { username } = decodedRefreshToken;

    if (this.refreshTokens[refreshToken] === username) {
      delete this.refreshTokens[refreshToken];
      return true;
    }

    return false;
  }

  private getAuthResponse(user: User) {
    const { username, roleId: role } = user;
    const payload = { username, role };
    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, { expiresIn: configuration.jwt.refreshToken.duration });

    this.deleteAllRefreshTokensFromUser(username);
    this.refreshTokens[refreshToken] = user.username;

    // console.log('Refresh tokens:', Object.keys(this.refreshTokens).length);
    return { accessToken, refreshToken };
  }

  private deleteAllRefreshTokensFromUser(username: Username) {
    // console.log('Before - Refresh tokens:', Object.keys(this.refreshTokens).length);
    Object.entries(this.refreshTokens).forEach(([key, value]) => {
      if (value === username) {
        //   console.log('Refresh token delente', this.refreshTokens[key]);
        delete this.refreshTokens[key];
      }
    });
    // console.log('After - Refresh tokens:', Object.keys(this.refreshTokens).length);
  }
}
