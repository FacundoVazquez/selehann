import { NestFactory } from '@nestjs/core';
import * as env from 'dotenv';
import { Logger } from 'nestjs-pino';
import { AppModule } from './app.module';
import { config } from './infrastructure/config/app.config';

declare const module: any;

function setup() {
  env.config();
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule, config.options);

  config.options?.logger === false && app.useLogger(app.get(Logger));

  config.globals.filters.forEach((f) => app.useGlobalFilters(f));
  config.globals.interceptors.forEach((i) => app.useGlobalInterceptors(i));
  config.globals.pipes.forEach((p) => app.useGlobalPipes(p));

  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);

  // Hot module
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}

setup();
bootstrap();
