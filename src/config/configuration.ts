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
	name: string;
};

export const appConfig = (): { appConfig: AppConfig } => ({
	appConfig: {
		env: process.env.NODE_ENV as NodeEnv,
		listeningPort: parseInt(process.env.PORT, 10) || 3000,
	},
});

export const databaseConfig = (): { databaseConfig: DatabaseConfig } => ({
	databaseConfig: {
		username: process.env.DB_USERNAME,
		password: process.env.DB_PASSWORD,
		host: process.env.DB_HOST,
		port: parseInt(process.env.DATABASE_PORT, 10),
		name: process.env.DB_NAME,
	},
});
