import {
	ArgumentsHost,
	Catch,
	ExceptionFilter,
	HttpException,
	HttpStatus,
	Inject,
	Logger,
	LoggerService,
} from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
	constructor(@Inject(Logger) private readonly logger: LoggerService) {}

	catch(exception: HttpException, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const req = ctx.getRequest();
		const res = ctx.getResponse();
		const status = exception.getStatus ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
		const { errorCode }: any = exception.getResponse();

		let constraints = undefined;

		if (
			status === HttpStatus.BAD_REQUEST &&
			exception.stack.includes('ValidationPipe.exceptionFactory') &&
			typeof exception.getResponse() === 'object'
		) {
			console.log('HEEEEEEEEE');
			const { message: msgResponse }: any = exception.getResponse();
			constraints = msgResponse;
		}

		const errorResponse = {
			statusCode: status,
			timestamp: new Date().toISOString(),
			method: req.method,
			path: req.url,
			errorCode,
			message: status !== HttpStatus.INTERNAL_SERVER_ERROR ? exception.message || null : 'Internal server error',
			constraints,
		};

		if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
			console.log('SDGA', status);
			this.logger.error(`${req.method} ${status} ${req.url}`, exception.stack, HttpExceptionFilter.name);
		} else {
			console.log('SDGAfas', status);
			this.logger.error(
				`${req.method} ${status} ${req.url}`,
				`${JSON.stringify(errorResponse)}`,
				HttpExceptionFilter.name,
			);
		}

		res.status(status).json(errorResponse);
	}
}
