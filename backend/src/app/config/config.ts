import { LoggerService, NestApplicationOptions, ValidationPipe } from '@nestjs/common';
import { configuration } from './configuration/configuration';
import { ExceptionsFilter } from './filters/exceptions.filter';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { NestApplicationGlobalOptions } from './types';

export function setupGlobalOptions(logger: LoggerService): NestApplicationGlobalOptions {
  return {
    filters: [new ExceptionsFilter(logger)],
    interceptors: [new LoggingInterceptor()],
    pipes: [new ValidationPipe({ whitelist: true })],
  };
}

export const options: NestApplicationOptions = {
  logger: false, // Setted as false to use a custom logger. Don't change.
  bufferLogs: configuration.logger.buffer,
  cors: { origin: configuration.origin },
};
