import * as dotenv from 'dotenv';

dotenv.config({ path: `.env.${process.env.STAGE}` });

export type NodeEnv = 'dev' | 'integ' | 'test' | 'prod';

export type AppConfig = {
	env: NodeEnv;
	listeningPort: number;
};

export type DatabaseConfig = {
	username: string;
	password: string;
	host: string;
	port: number;
	dbname: string;
};

export const appConfig = (): { appConfig: AppConfig } => ({
	appConfig: {
		env: process.env.NODE_ENV as NodeEnv,
		listeningPort: +process.env.PORT || 3000,
	},
});

export const databaseConfig = (): { databaseConfig: DatabaseConfig } => ({
	databaseConfig: {
		username: process.env.DATABASE_USER,
		password: process.env.DATABASE_PASSWORD,
		host: process.env.DATABASE_HOST,
		port: +process.env.DATABASE_PORT,
		dbname: process.env.DATABASE_DB,
	},
});
