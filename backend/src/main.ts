import { HttpStatus, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Logger } from 'nestjs-pino';
import { AppModule } from 'src/app/app.module';
import { options, setupGlobalOptions } from './app/config/config';
import { configuration } from './app/config/configuration/configuration';
import { setupSwagger } from './app/config/swagger';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, options);

  const logger = app.get<Logger>(Logger);
  app.useLogger(logger);

  const globalOptions = setupGlobalOptions(logger);
  globalOptions.filters.forEach((f) => app.useGlobalFilters(f));
  //globalOptions.interceptors.forEach((i) => app.useGlobalInterceptors(i));
  globalOptions.pipes.forEach((p) => app.useGlobalPipes(p));
  //app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  const swagger = setupSwagger(app);

  await app.listen(configuration.port);
  logger.log(`Application is running on: ${await app.getUrl()}`);
  if (swagger.enabled) logger.log(`Swagger is running on: ${await app.getUrl()}/${swagger.path}`);

  // Hot module
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}

bootstrap();
