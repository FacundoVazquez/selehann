import { LoggerModule as LoggerPinoModule } from 'nestjs-pino';
import { configuration } from '../configuration/configuration';
import { hideSensibilityData } from './logger.utils';

const ID_MAX_VALUE = 999999;
let id = 0;

export const LoggerModule = LoggerPinoModule.forRoot({
  pinoHttp: {
    level: configuration.logger.level,
    genReqId: (req) => {
      return (
        Buffer.from(`${req.socket.remoteAddress}${req.socket.remotePort}`).toString('base64') +
        ':' +
        `${id++ % (ID_MAX_VALUE + 1)}`.padStart(ID_MAX_VALUE.toString().length, '0')
      );
    },
    customSuccessMessage: () => 'Response',
    customErrorMessage: () => 'Response',
    serializers: {
      req(req: any) {
        req.body = hideSensibilityData(req.raw.body, ['password']);
        return req;
      },
    },
    prettyPrint:
      configuration.logger.type !== 'json'
        ? {
            translateTime: 'yyyy-mm-dd HH:MM:ss.l',
            singleLine: true,
          }
        : false,
  },
});
