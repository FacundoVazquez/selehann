import { ExceptionFilter, NestApplicationOptions, NestInterceptor, PipeTransform, ValidationPipe } from '@nestjs/common';
import { ExceptionsFilter } from '../filters/exceptions.filter';
import { LoggingInterceptor } from '../interceptors/logging.interceptor';

interface AppConfig {
  options?: NestApplicationOptions;
  globals?: {
    filters?: ExceptionFilter[];
    interceptors?: NestInterceptor[];
    pipes?: PipeTransform<any>[];
  };
}

export const config: AppConfig = {
  options: { logger: undefined, cors: { origin: '*' } },
  globals: {
    filters: [new ExceptionsFilter()],
    interceptors: [new LoggingInterceptor()],
    pipes: [new ValidationPipe({ whitelist: true })],
  },
};
