import { HttpException, HttpStatus } from '@nestjs/common';

export class DeveloperNotFoundException extends HttpException {
  constructor() {
    super('Developer not found', HttpStatus.NOT_FOUND);
  }
}

export class AssignResourceFailedException extends HttpException {
  constructor(reason: string) {
    super('Assign resource failed: ' + reason, HttpStatus.UNPROCESSABLE_ENTITY);
  }
}
