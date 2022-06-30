import { appConfig, databaseConfig, oauthConfig } from './config.constant';

import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { configValidationSchema } from './config.validation';

@Module({
	imports: [
		NestConfigModule.forRoot({
			isGlobal: true,
			envFilePath: [`.env.${process.env.STAGE}`],
			load: [appConfig, databaseConfig, oauthConfig],
			validationSchema: configValidationSchema,
		}),
	],
})
export class ConfigModule {}
