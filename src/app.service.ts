import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppConfig, DatabaseConfig } from './config/config.constant';

@Injectable()
export class AppService {
	getHello(): string {
		return 'Hello ZuZu!';
	}
}
