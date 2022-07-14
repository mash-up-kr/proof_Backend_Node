import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { AppConfig, DatabaseConfig } from 'src/config/config.constant';

const config: TypeOrmModuleOptions = {
	type: 'postgres',
	host: process.env.DATABASE_HOST,
	port: +process.env.DATABASE_PORT,
	username: process.env.DATABASE_USER,
	password: process.env.DATABASE_PASSWORD,
	database: process.env.DATABASE_DB,
	namingStrategy: new SnakeNamingStrategy(),
	synchronize: process.env.NODE_ENV !== 'prod',
	logging: process.env.NODE_ENV !== 'prod',
	dropSchema: process.env.NODE_ENV === 'test',
	autoLoadEntities: true,
};

@Module({
	imports: [
		TypeOrmModule.forRootAsync({
			useFactory: async (configService: ConfigService): Promise<TypeOrmModuleOptions> => {
				const dbConfig = configService.get<DatabaseConfig>('databaseConfig');
				const appConfig = configService.get<AppConfig>('appConfig');
				return config;
			},
			inject: [ConfigService],
		}),
	],
})
export class DatabaseModule {}
