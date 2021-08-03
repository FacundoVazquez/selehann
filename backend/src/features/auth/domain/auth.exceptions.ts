import { HttpException, HttpStatus } from '@nestjs/common';

export class CredentialsNotValidException extends HttpException {
  constructor() {
    super('User credentials not valid', HttpStatus.UNAUTHORIZED);
  }
}

export class PasswordsNotMatchException extends HttpException {
  constructor() {
    super("Passwords doesn't match", HttpStatus.BAD_REQUEST);
  }
}

export class RefreshTokenNotValidException extends HttpException {
  constructor() {
    super('Refresh token not valid: refresh token is not valid or expired', HttpStatus.UNAUTHORIZED);
  }
}
