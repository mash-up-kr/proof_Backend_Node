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

export type OauthConfig = {
	kakao: {
		clientId: string;
		callbackUrl: string;
	};
};

export type JwtConfig = {
	jwtAccessTokenSecret: string;
	jwtAccessTokenExpire: string;
	jwtRefreshTokenSecret: string;
	jwtRefreshTokenExpire: string;
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

export const oauthConfig = (): { oauthConfig: OauthConfig } => ({
	oauthConfig: {
		kakao: {
			clientId: process.env.KAKAO_CLIENT_ID,
			callbackUrl: process.env.KAKAO_CALLBACK_URL,
		},
	},
});

export const jwtConfig = (): { jwtConfig: JwtConfig } => ({
	jwtConfig: {
		jwtAccessTokenSecret: process.env.JWT_ACCESS_TOKEN_SECRET,
		jwtAccessTokenExpire: process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME,
		jwtRefreshTokenSecret: process.env.JWT_REFRESH_TOKEN_SECRET,
		jwtRefreshTokenExpire: process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME,
	},
});
