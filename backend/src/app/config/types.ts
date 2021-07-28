import { ExceptionFilter, NestInterceptor, PipeTransform } from '@nestjs/common';

export interface NestApplicationGlobalOptions {
  filters?: ExceptionFilter[];
  interceptors?: NestInterceptor[];
  pipes?: PipeTransform<any>[];
}
