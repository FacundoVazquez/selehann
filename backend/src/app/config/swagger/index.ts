/* eslint-disable @typescript-eslint/no-var-requires */

import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerCustomOptions, SwaggerModule } from '@nestjs/swagger';
import { capitalize } from 'lodash';
import { configuration } from '../configuration/configuration';

export interface SwaggerOptions {
  enabled: boolean;
  title: string;
  description: string;
  version: string;
  path: string;
  optionsUI?: SwaggerCustomOptions;
}

export const setupSwagger = (app: INestApplication, config?: SwaggerOptions) => {
  const { name, description, version } = require('../../../../package.json');
  const swagger: SwaggerOptions = {
    enabled: configuration.swagger.enabled,
    title: `Swagger - ${capitalize(name as string)}`,
    description: `${description}`,
    version,
    path: configuration.swagger.path ?? 'api/swagger',
    optionsUI: {
      swaggerOptions: {
        filter: true,
        showRequestDuration: true,
        persistAuthorization: true,
      },
      ...config?.optionsUI,
    },
    ...config,
  };

  if (swagger.enabled) {
    const { title, description, version, path } = swagger;

    const options = new DocumentBuilder()
      .setTitle(title)
      .setDescription(description)
      .setVersion(version)
      .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' })
      .build();

    const document = SwaggerModule.createDocument(app, options, {
      deepScanRoutes: true,
      operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
    });

    SwaggerModule.setup(path, app, document, swagger.optionsUI);

    return swagger;
  }
};
