import * as dotenv from 'dotenv';

dotenv.config({ path: `.env.${process.env.STAGE}` });

export type NodeEnv = 'dev' | 'integ' | 'test' | 'prod';

export type AppConfig = {
	env: NodeEnv;
	listeningPort: number;
	cors: {
		origin: string[] | true; // TODO: Change to false after origins are fixed.
	};
};

export type DatabaseConfig = {
	username: string;
	password: string;
	host: string;
	port: number;
	dbname: string;
};

export type AdminConfig = {
	email: string;
};

export type JwtConfig = {
	jwtAccessTokenSecret: string;
	jwtAccessTokenExpire: string;
	jwtAccessTokenExpireAdmin: string;
	jwtRefreshTokenSecret: string;
	jwtRefreshTokenExpire: string;
};

export const appConfig = (): { appConfig: AppConfig } => ({
	appConfig: {
		env: process.env.NODE_ENV as NodeEnv,
		listeningPort: +process.env.PORT || 3000,
		cors: {
			origin: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : true, // TODO: Change to false after origins are fixed.
		},
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

export const adminConfig = (): { adminConfig: AdminConfig } => ({
	adminConfig: {
		email: process.env.ADMIN_EMAIL,
	},
});

export const jwtConfig = (): { jwtConfig: JwtConfig } => ({
	jwtConfig: {
		jwtAccessTokenSecret: process.env.JWT_ACCESS_TOKEN_SECRET,
		jwtAccessTokenExpire: process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME,
		jwtAccessTokenExpireAdmin: process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME_ADMIN,
		jwtRefreshTokenSecret: process.env.JWT_REFRESH_TOKEN_SECRET,
		jwtRefreshTokenExpire: process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME,
	},
});
