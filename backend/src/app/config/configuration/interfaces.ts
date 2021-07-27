import { NestApplicationOptions, ExceptionFilter, NestInterceptor, PipeTransform } from '@nestjs/common';

export interface ObjectConfiguration {
  port: number;
  logger: boolean;
  swagger: boolean;
  origin: string;
  [key: string]: any;
}

export interface AppSettings {
  options?: NestApplicationOptions;
  globals?: {
    filters?: ExceptionFilter[];
    interceptors?: NestInterceptor[];
    pipes?: PipeTransform<any>[];
  };
}
