import { HttpException, HttpStatus } from '@nestjs/common';

export class LicenseNotFoundException extends HttpException {
  constructor(id: string) {
    super(`License '${id}' not found`, HttpStatus.NOT_FOUND);
  }
}

export class CreateLicenseException extends HttpException {
  constructor(stack?: string) {
    super(`Unable to create license`, HttpStatus.UNPROCESSABLE_ENTITY);
    this.stack = stack;
  }
}
