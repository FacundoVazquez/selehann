import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, LoggerService } from '@nestjs/common';
import { Request, Response } from 'express';
import { Logger } from 'nestjs-pino';

@Catch()
export class ExceptionsFilter implements ExceptionFilter {
  constructor(private readonly logger: LoggerService) {}

  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    const internalMessage = exception.message;
    const message = exception.message ?? 'An error occurred on the server!';

    console.log(exception);
    /*  if (exception instanceof HttpException)
      if (typeof exception.getResponse() === 'string') message = exception.getResponse().toString();
      else message = (exception.getResponse() as any)?.message;
    if (exception instanceof MongoError) message = exception.message; */

    console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX');

    this.logger.error(internalMessage, exception.stack, ExceptionsFilter.name);

    console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX');

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message,
    });
  }
}
