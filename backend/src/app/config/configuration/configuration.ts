import { LogType, LogLevel } from '../logger/types';
import { parseBoolean } from '../utils/types.utils';
import { ConfigurationError } from './configuration.exception';
import { ObjectConfiguration } from './types';

export const configuration: ObjectConfiguration = {
  port: parseInt(process.env.PORT, 10) || 3000,
  logger: {
    type: (() => {
      const value = process.env.LOGGER_TYPE;
      if (Object.values(LogType).includes(process.env.LOGGER_TYPE as any)) return process.env.LOGGER_TYPE;
      throw new ConfigurationError(`Invalid logger type: ${value}`);
    })() as LogType,
    level: (() => {
      const value = process.env.LOGGER_TYPE;
      if (Object.values(LogLevel).includes(process.env.LOGGER_LEVEL as any)) return process.env.LOGGER_LEVEL;
      throw new ConfigurationError(`Invalid logger level: ${value}`);
    })() as LogLevel,
    buffer: (() => {
      const value = process.env.LOGGER_BUFFER;
      try {
        return parseBoolean(process.env.LOGGER_BUFFER);
      } catch (err) {}
      throw new ConfigurationError(`Invalid logger buffer: ${value}`);
    })() as boolean,
  },
  swagger: {
    enabled: (() => {
      const value = process.env.SWAGGER_ENABLED;
      try {
        return parseBoolean(process.env.SWAGGER_ENABLED);
      } catch (err) {}
      throw new ConfigurationError(`Invalid swagger status: ${value}`);
    })() as boolean,
    path: process.env.SWAGGER_PATH,
  },
  origin: process.env.ORIGIN,
};
