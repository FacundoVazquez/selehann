import { HttpException, HttpStatus } from '@nestjs/common';

export class AssetNotFoundException extends HttpException {
  constructor(id: string) {
    super(`Asset '${id}' not found`, HttpStatus.NOT_FOUND);
  }
}

export class CreateAssetException extends HttpException {
  constructor(stack?: string) {
    super(`Unable to create asset`, HttpStatus.UNPROCESSABLE_ENTITY);
    this.stack = stack;
  }
}
