import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

// TODO HACKME XXX

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  //constructor(private readonly authService: AuthService) {
  constructor() {
    super();
  }
  /* 
  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  } */
}