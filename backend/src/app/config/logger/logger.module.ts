import { LoggerModule as LoggerPinoModule } from 'nestjs-pino';
import { configuration } from '../configuration/configuration';

export const LoggerModule = LoggerPinoModule.forRoot({
  pinoHttp: {
    level: configuration.logger.level,
    prettyPrint:
      configuration.logger.type !== 'json'
        ? {
            translateTime: 'yyyy-mm-dd HH:MM:ss.l',
            singleLine: true,
          }
        : false,
  },
});
