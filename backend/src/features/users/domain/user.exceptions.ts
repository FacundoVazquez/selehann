import { HttpException, HttpStatus } from '@nestjs/common';

export class UserNotFoundException extends HttpException {
  constructor(user: string) {
    super(`User '${user}' not found`, HttpStatus.NOT_FOUND);
  }
}

export class UserAlreadyExistException extends HttpException {
  constructor(user: string) {
    super(`User '${user}' already exist`, HttpStatus.UNPROCESSABLE_ENTITY);
  }
}

export class HashPasswordException extends HttpException {
  constructor(err?: Error) {
    super(`Unable to hash password`, HttpStatus.UNPROCESSABLE_ENTITY);
    this.stack = err.stack;
  }
}

export class CreateUserException extends HttpException {
  constructor(err?: Error) {
    super(`Unable to create user`, HttpStatus.UNPROCESSABLE_ENTITY);
    this.stack = err.stack;
  }
}
