import { Injectable, LoggerService } from '@nestjs/common';

import * as winston from 'winston';
import { utilities as nestWinstonModuleUtilities, WinstonModule } from 'nest-winston';

@Injectable()
export class LoggerConfigService {
	private transports: any;
	private readonly options: winston.LoggerOptions;
	private _logger: winston.Logger;
	private static _instance: LoggerConfigService;

	constructor() {
		this.transports = {
			console: new winston.transports.Console({
				level: process.env.NODE_ENV === 'prod' ? 'info' : 'debug',
				format: winston.format.combine(
					winston.format.timestamp(),
					nestWinstonModuleUtilities.format.nestLike('proof-api-server', { prettyPrint: true }),
				),
			}),
			file: new winston.transports.File({
				filename: 'logs/proof-api-server-errors.log',
				level: 'error',
			}),
			http: new winston.transports.Http({
				level: 'error',
				format: winston.format.json(),
			}),
		};

		this.options = {
			levels: winston.config.syslog.levels,
			transports: [this.transports.console, this.transports.file, this.transports.http],
		};

		this._logger = winston.createLogger(this.options);
	}

	public static getInstance(): LoggerConfigService {
		if (!this._instance) {
			this._instance = new LoggerConfigService();
		}
		return this._instance;
	}

	getLogger(): LoggerService {
		return WinstonModule.createLogger(this._logger);
	}
}
