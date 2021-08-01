import { Body, Controller, HttpCode, HttpException, HttpStatus, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LoginDto } from 'src/features/auth/application/dto';
import { RefreshTokenDto } from 'src/features/auth/application/dto/refresh-token.dto';
import { RegisterDto } from 'src/features/auth/application/dto/register.dto';
import { AuthService } from 'src/features/auth/application/service/auth.service';
import { LoginFailedException } from '../../../application/exceptions/auth.exceptions';

@ApiTags('Auth')
@Controller({ path: 'auth', version: '1' })
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  //@UseGuards(JwtAuthGuard)
  async login(@Body() loginDto: LoginDto) {
    return await this.authService.loginUser(loginDto);
  }

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  //@UseGuards(JwtAuthGuard)
  async register(@Body() registerDto: RegisterDto) {
    return await this.authService.registerUser(registerDto);
  }

  @Post('token')
  @HttpCode(HttpStatus.OK)
  //@UseGuards(JwtAuthGuard)
  async getAccessToken(@Body() refreshTokenDto: RefreshTokenDto) {
    return await this.authService.createAccessToken(refreshTokenDto);
  }

  @Post('token/reject')
  @HttpCode(HttpStatus.OK)
  //@UseGuards(JwtAuthGuard)
  async deleteRefreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
    return await this.authService.deleteRefreshToken(refreshTokenDto);
  }
}
