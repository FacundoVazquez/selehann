import { TypeOrmModuleOptions } from '../database/types';
import { LogLevel, LogType } from '../logger/types';

export interface ObjectConfiguration {
  port: number;
  databases: {
    logger: boolean;
    mysql?: TypeOrmModuleOptions[];
  };
  logger: {
    type: LogType;
    level: LogLevel;
    buffer: boolean;
  };
  swagger: {
    enabled: boolean;
    path: string;
  };
  jwt: {
    secret: string;
    accessToken: { duration: string };
    refreshToken: { duration: string };
  };
  origin: string;
  [key: string]: any;
}
