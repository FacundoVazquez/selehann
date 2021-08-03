import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { configuration } from 'src/app/config/configuration/configuration';
import { verifyPassword } from 'src/app/config/crypto';
import { UserAlreadyExistException, UserNotFoundException } from 'src/features/users/domain/user.exceptions';
import { User } from 'src/features/users/domain/entities/user.entity';
import { Username } from 'src/features/users/domain/user.types';
import { AuthResponse, RefreshToken } from '../domain/auth.types';
import { LoginDto } from './dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { RegisterDto } from './dto/register.dto';
import { CredentialsNotValidException, PasswordsNotMatchException, RefreshTokenNotValidException } from '../domain/auth.exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(private readonly manager: EntityManager, private readonly jwtService: JwtService) {}

  private readonly refreshTokens = {};

  async loginUser(loginDto: LoginDto) {
    const { username, password } = loginDto;

    // Find user
    const user = await this.manager.findOne(User, { username });

    if (!user) throw new UserNotFoundException(username);

    // Verify password
    const isValid = verifyPassword(user.password, user.salt, password);

    if (!isValid) throw new CredentialsNotValidException();

    // Get auth response (Tokens)
    return this.getAuthResponse(user);
  }

  async registerUser(registerDto: RegisterDto) {
    const { username, password, repeatedPassword, role: roleId } = registerDto;

    // Verify if passwords match
    if (password != repeatedPassword) throw new PasswordsNotMatchException();

    // Create user
    try {
      const user = this.manager.create(User, { username, password, roleId });
      await this.manager.save(User, user);

      return this.getAuthResponse(user);
    } catch (err) {
      throw new UserAlreadyExistException(username);
    }
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
    return { accessToken, refreshToken } as AuthResponse;
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
