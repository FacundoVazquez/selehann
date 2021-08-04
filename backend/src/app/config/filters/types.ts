import { HttpStatus } from '@nestjs/common';
import { TypeORMError } from 'typeorm';

export interface JsonResponse {
  statusCode: HttpStatus;
  timestamp: string;
  method: string;
  path: string;
  message: string;
}
