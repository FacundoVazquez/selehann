import { Inject, Injectable } from '@nestjs/common';
import { IAuthRepository } from '../../domain/repository/auth.repository';
import { LoginDto } from '../dto';

@Injectable({})
export class AuthService {
  constructor(@Inject('AUTH_REPOSITORY') private readonly authRepository: IAuthRepository) {}

  async loginUser(loginDto: LoginDto) {
    const { username, password } = loginDto;
    const user = await this.authRepository.validateUser(username, password);
    if (user) return await this.authRepository.login(user);
    return null;
  }
}
