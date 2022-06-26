import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';

import { appConfig, databaseConfig } from './configuration';
import { configValidationSchema } from './validation';

@Module({
	imports: [
		NestConfigModule.forRoot({
			isGlobal: true,
			envFilePath: [`.env.${process.env.STAGE}`],
			load: [appConfig, databaseConfig],
			validationSchema: configValidationSchema,
		}),
	],
})
export class ConfigModule {}
