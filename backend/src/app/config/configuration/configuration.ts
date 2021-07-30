import { LogType, LogLevel } from '../logger/types';
import { parseBoolean } from '../utils/types.utils';
import { ConfigurationException } from './configuration.exception';
import { ObjectConfiguration } from './types';
import { config } from 'dotenv';
import { buildMongoConnectionUri } from '../database/mongo/mongo.utils';

config();

export const configuration: ObjectConfiguration = {
  port: parseInt(process.env.PORT, 10) || 3000,
  databases: {
    mongo: (() => {
      const values = { scheme: process.env.DATABASE_SCHEME, username: process.env.DATABASE_USERNAME, password: process.env.DATABASE_PASSWORD };
      const uri = buildMongoConnectionUri(process.env.DATABASE_URI, values);

      return [
        {
          options: {
            uri,
            dbName: process.env.DATABASE_NAME,
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
          },
        },
      ];
    })(),
  },
  logger: {
    type: (() => {
      const value = process.env.LOGGER_TYPE;

      if (Object.values(LogType).includes(value as any)) return value;
      throw new ConfigurationException(`Invalid logger type: ${value}`);
    })() as LogType,
    level: (() => {
      const value = process.env.LOGGER_LEVEL;

      if (Object.values(LogLevel).includes(value as any)) return value;

      throw new ConfigurationException(`Invalid logger level: ${value}`);
    })() as LogLevel,
    buffer: (() => {
      const value = process.env.LOGGER_BUFFER;

      try {
        return parseBoolean(value);
      } catch (err) {
        throw new ConfigurationException(`Invalid logger buffer: ${value}`);
      }
    })(),
  },
  swagger: {
    enabled: (() => {
      const value = process.env.SWAGGER_ENABLED;

      try {
        return parseBoolean(value);
      } catch (err) {
        throw new ConfigurationException(`Invalid swagger status: ${value}`);
      }
    })() as boolean,
    path: process.env.SWAGGER_PATH ?? 'api/swagger',
  },
  jwt: {
    secret: (() => {
      const value = process.env.JWT_SECRET;

      if (value?.length > 0) return value;

      throw new ConfigurationException(`Invalid jwt secret: ${value}`);
    })() as string,
  },
  origin: process.env.ORIGIN,
};
