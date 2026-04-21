import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

@Catch()
export class GlobalHttpExceptionFilter implements ExceptionFilter {
  constructor(
    @InjectPinoLogger(GlobalHttpExceptionFilter.name)
    private readonly logger: PinoLogger,
  ) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const isHttpException = exception instanceof HttpException;
    const status = isHttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    const errorResponse = isHttpException
      ? exception.getResponse()
      : { message: 'Internal server error' };

    const message =
      typeof errorResponse === 'string'
        ? errorResponse
        : (errorResponse as { message?: string | string[] }).message ??
          'Internal server error';

    const logPayload = {
      method: request.method,
      url: request.url,
      statusCode: status,
      message,
    };

    if (status >= HttpStatus.INTERNAL_SERVER_ERROR) {
      this.logger.error(
        {
          ...logPayload,
          err: exception,
        },
        'HTTP request failed',
      );
    } else {
      this.logger.warn(logPayload, 'HTTP request rejected');
    }

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message,
    });
  }
}
