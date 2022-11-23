import { ExceptionFilter, Catch, ArgumentsHost, HttpException, Logger } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger('HttpExceptionHandler');

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    if (exception instanceof HttpException) {
      response.status(exception.getStatus()).json(exception.getResponse());
    } else {
      this.logger.error(exception);
      response.status(500).json({
        message: 'Internal Server Error',
        stack: exception?.stack,
        timestamp: new Date().toISOString(),
        request: `${request.method} ${request.url}`,
      });
    }
  }
}
