import { HttpException, HttpStatus } from '@nestjs/common';

export class DeveloperNotFoundException extends HttpException {
  constructor(id: string) {
    super(`Developer '${id}' not found`, HttpStatus.NOT_FOUND);
  }
}

export class SetDeveloperStatusException extends HttpException {
  constructor(reason: string) {
    super('Unable to set status to developers: ' + reason, HttpStatus.UNPROCESSABLE_ENTITY);
  }
}

export class AssignResourceException extends HttpException {
  constructor(reason: string) {
    super('Assign resource failed: ' + reason, HttpStatus.UNPROCESSABLE_ENTITY);
  }
}

export class RevokeResourceException extends HttpException {
  constructor(reason: string) {
    super('Revoke resource failed: ' + reason, HttpStatus.UNPROCESSABLE_ENTITY);
  }
}

export class CreateDeveloperException extends HttpException {
  constructor(stack?: string) {
    super(`Unable to create developer`, HttpStatus.UNPROCESSABLE_ENTITY);
    this.stack = stack;
  }
}
