import { CallHandler, ExecutionContext, Injectable, LoggerService, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  constructor(private readonly logger: LoggerService) {}

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    /*     const ctx = context.switchToHttp();
    const response = ctx.getResponse();
    console.log('1', response.data);
    console.log('1', response.body);
    console.log('1', response.statusCode);
 */
    return next.handle().pipe(
      tap(() => {
        /*    const ctx = context.switchToHttp();
        const response = ctx.getResponse();
        console.log('2', response.data);
        console.log('2', response.body);
        console.log('2', response.statusCode);
        response.status(204); */
      }),
    );
  }
}
