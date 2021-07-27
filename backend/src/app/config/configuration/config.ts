import { LoggerService, ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import { ExceptionsFilter } from '../filters/exceptions.filter';
import { LoggingInterceptor } from '../interceptors/logging.interceptor';
import { AppSettings, ObjectConfiguration } from './interfaces';

export const configuration: ObjectConfiguration = {
  port: parseInt(process.env.PORT, 10) || 3000,
  logger: process.env.LOGGER === 'true' ? true : false,
  swagger: process.env.SWAGGER_ENABLED === 'true' ? true : false,
  origin: process.env.ORIGIN,
};

export const settings: AppSettings = {
  options: { logger: /* config.logger && undefined */ false, cors: { origin: configuration.origin } },
  globals: {
    filters: [], // [new ExceptionsFilter(/* settings.options.logger as Logger */)],
    interceptors: [new LoggingInterceptor()],
    pipes: [new ValidationPipe({ whitelist: true })],
  },
};
