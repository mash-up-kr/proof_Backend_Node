export type NodeEnv = 'dev' | 'test' | 'prod';

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
		username: process.env.POSTGRES_USER,
		password: process.env.POSTGRES_PASSWORD,
		host: process.env.POSTGRES_HOST,
		port: +process.env.POSTGRES_PORT,
		dbname: process.env.POSTGRES_DB,
	},
});
