import { LogLevel, LogType } from '../logger/types';

export interface ObjectConfiguration {
  port: number;
  logger: {
    type: LogType;
    level: LogLevel;
    buffer: boolean;
  };
  swagger: {
    enabled: boolean;
  };
  origin: string;
  [key: string]: any;
}
