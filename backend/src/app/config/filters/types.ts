import { HttpStatus } from '@nestjs/common';

export interface JsonResponse {
  statusCode: HttpStatus;
  timestamp: string;
  method: string;
  path: string;
  message: string;
}
