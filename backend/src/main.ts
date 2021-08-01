import { VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as helmet from 'helmet';
import { config, database, up } from 'migrate-mongo';
import { Logger } from 'nestjs-pino';
import { AppModule } from 'src/app/app.module';
import { options, setupGlobalOptions } from './app/config/config';
import { configuration } from './app/config/configuration/configuration';
import { setupSwagger } from './app/config/swagger';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, options);

  app.enableVersioning({
    type: VersioningType.URI,
    prefix: 'api/v',
  });

  const logger = app.get<Logger>(Logger);
  app.useLogger(logger);

  app.use(helmet());

  const globalOptions = setupGlobalOptions(logger);
  globalOptions.filters?.forEach((f) => app.useGlobalFilters(f));
  globalOptions.pipes?.forEach((p) => app.useGlobalPipes(p));
  globalOptions.interceptors?.forEach((i) => app.useGlobalInterceptors(i));

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

async function runMigrations() {
  config.set({
    mongodb: {
      url: configuration.databases.mongo[0].options.uri,
      databaseName: configuration.databases.mongo[0].options.dbName,
      options: {
        useNewUrlParser: configuration.databases.mongo[0].options.useNewUrlParser,
      },
    },
    changelogCollectionName: 'migrations',
    migrationsDir: 'src/app/config/database/mongo/migrations',
  });

  await database
    .connect()
    .then(async (value) => {
      const db = value.db;
      const client = value.client;

      const migrated = await up(db);

      if (migrated.length > 0) migrated.forEach((fileName) => console.log('Migrated: ', fileName));
      else console.log('Migrations already ran!');

      await client.close();
    })
    .catch((err) => {
      console.log('Error running migrations');
      throw err;
    });
}

runMigrations();
bootstrap();
