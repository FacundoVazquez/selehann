import { TypeORMError } from 'typeorm';

export class DatabaseException extends TypeORMError {
  readonly code: string;

  constructor(error: Error, message?: string) {
    super(message);
    this.code = (error as any).code;
  }
}

export enum DatabaseExceptionCode {
  ER_DUP_ENTRY = 'ER_DUP_ENTRY',
}
