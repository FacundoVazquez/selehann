import { MongoDB } from '../database/types';
import { LogLevel, LogType } from '../logger/types';

export interface ObjectConfiguration {
  port: number;
  databases: {
    mongo: MongoDB[];
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
  };
  origin: string;
  [key: string]: any;
}
