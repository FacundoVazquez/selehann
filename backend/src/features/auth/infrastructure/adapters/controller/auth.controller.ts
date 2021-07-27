import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LoginDto } from 'src/features/auth/application/dto';
import { AuthService } from 'src/features/auth/application/service/auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  //@UseGuards(JwtAuthGuard)
  async login(@Body() loginDto: LoginDto) {
    return await this.authService.loginUser(loginDto);
  }
}
