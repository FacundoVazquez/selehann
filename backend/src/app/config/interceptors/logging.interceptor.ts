import { CallHandler, ExecutionContext, Injectable, LoggerService, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly logger: LoggerService) {}

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    this.logger.log('Request');

    return next.handle().pipe(tap());
  }
}
