import { HttpException, HttpStatus } from '@nestjs/common';

export class LoginFailedException extends HttpException {
  constructor() {
    super('Login failed: invalid credentials', HttpStatus.UNAUTHORIZED);
  }
}

export class RegisterFailedException extends HttpException {
  constructor(reason: string) {
    super('Register failed: ' + reason, HttpStatus.BAD_REQUEST);
  }
}

export class PasswordValidationFailedException extends HttpException {
  constructor() {
    super('Password validation failed: password doesn\t match', HttpStatus.BAD_REQUEST);
  }
}

export class RefreshTokenNotValidException extends HttpException {
  constructor() {
    super('Refresh token not valid: refresh token is not valid or expired', HttpStatus.UNAUTHORIZED);
  }
}
