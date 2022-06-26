import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppConfig, DatabaseConfig } from './config/configuration';

@Injectable()
export class AppService {
	constructor(private readonly configService: ConfigService) {}
	appConfig = this.configService.get<AppConfig>('appConfig');
	dbConfig = this.configService.get<DatabaseConfig>('databaseConfig');

	getHello(): string {
		return `Hello ZuZu! node env: ${this.appConfig.env} , db_name: ${this.dbConfig.name}`;
	}
}
