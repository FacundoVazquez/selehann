import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, LoggerService } from '@nestjs/common';
import { Request, Response } from 'express';
import { JsonResponse } from './types';
import { TypeORMError } from 'typeorm';

@Catch()
export class ExceptionsFilter implements ExceptionFilter {
  constructor(private readonly logger: LoggerService) {}

  catch(exception: Error, host: ArgumentsHost) {
    const httpContext = host.switchToHttp();
    const request = httpContext.getRequest<Request>();
    const response = httpContext.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = exception.message ?? 'An error occurred on the server!';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
    } else if (exception instanceof TypeORMError) {
      status = HttpStatus.UNPROCESSABLE_ENTITY;
      message = 'Error proccessing data!';
    }

    const shouldLog = status >= 400;
    const isServerError = status >= 500;

    if (shouldLog) {
      const message = 'Request failed';
      if (isServerError) this.logger.error(message, exception.stack, ExceptionsFilter.name);
      else this.logger.warn(`${message} (${exception.message})`, ExceptionsFilter.name);
    }

    const json: JsonResponse = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      method: request.method,
      path: request.url,
      message: message,
    };

    response.status(status).json(json);
  }
}
