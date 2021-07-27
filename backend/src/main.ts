import { LoggerService, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Logger } from 'nestjs-pino';
import { AppModule } from 'src/app/app.module';
import { configuration, settings } from 'src/app/config/configuration/config';
import { ExceptionsFilter } from './app/config/filters/exceptions.filter';
import { LoggingInterceptor } from './app/config/interceptors/logging.interceptor';
import { setupSwagger } from './app/config/swagger';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, settings.options);

  settings.options?.logger === false && app.useLogger(app.get(Logger));

  /*   const logger = app.get<Logger>(Logger);
  app.useLogger(logger);
  settings.options.logger = logger as LoggerService;

  app.useGlobalFilters(new ExceptionsFilter(logger));
  app.useGlobalInterceptors(new LoggingInterceptor());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true })); */

  /*   settings.globals.filters.forEach((f) => app.useGlobalFilters(f));
  settings.globals.interceptors.forEach((i) => app.useGlobalInterceptors(i));
  settings.globals.pipes.forEach((p) => app.useGlobalPipes(p)); */

  setupSwagger(app);

  await app.listen(configuration.port);
  console.log(`Application is running on: ${await app.getUrl()}`);

  // Hot module
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}

bootstrap();
