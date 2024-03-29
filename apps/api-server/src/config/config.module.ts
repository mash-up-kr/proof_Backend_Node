import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';

import { adminConfig, appConfig, databaseConfig, jwtConfig } from './config.constant';
import { configValidationSchema } from './config.validation';

@Module({
	imports: [
		NestConfigModule.forRoot({
			isGlobal: true,
			envFilePath: [`.env.${process.env.STAGE}`],
			load: [appConfig, databaseConfig, adminConfig, jwtConfig],
			validationSchema: configValidationSchema,
		}),
	],
})
export class ConfigModule {}
