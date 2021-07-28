import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, LoggerService } from '@nestjs/common';
import { Request, Response } from 'express';
import { Error } from 'mongoose';

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
    } else if (exception instanceof Error.ValidationError) {
      status = HttpStatus.UNPROCESSABLE_ENTITY;
      message = 'Data validation has failed!';
    }

    const shouldLog = status >= 400;
    const isServerError = status >= 500;

    if (shouldLog)
      if (isServerError) this.logger.error('Request failed', exception.stack, ExceptionsFilter.name);
      else this.logger.warn(`Request failed (${exception.message})`, ExceptionsFilter.name);

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      method: request.method,
      path: request.url,
      message,
    });
  }
}
