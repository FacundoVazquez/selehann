import { HttpException, HttpStatus } from '@nestjs/common';
import { DatabaseException } from 'src/app/config/database/exceptions/database.exception';

export class DeveloperNotFoundException extends HttpException {
  constructor(err?: Error, id?: string) {
    super(`Developer '${id}' not found`, HttpStatus.NOT_FOUND);
    this.stack = err?.stack;
  }
}

export class UnableUpdateUserInactiveException extends HttpException {
  constructor(err?: Error) {
    super('Unable to update: User inactive', HttpStatus.BAD_REQUEST);
    this.stack = err?.stack;
  }
}

export class CreateDeveloperException extends DatabaseException {
  constructor(err?: Error) {
    super(err, `Unable to create developer`);
    this.stack = err?.stack;
  }
}

export class SetDeveloperStatusException extends DatabaseException {
  constructor(err?: Error) {
    super(err, 'Unable to set status to developers');
    this.stack = err?.stack;
  }
}

export class AssignResourceException extends DatabaseException {
  constructor(err?: Error) {
    super(err, 'Assign resource failed');
    this.stack = err?.stack;
  }
}

export class RevokeResourceException extends DatabaseException {
  constructor(err?: Error) {
    super(err, 'Revoke resource failed');
    this.stack = err?.stack;
  }
}
