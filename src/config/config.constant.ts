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
		redirectUrl: string;
	};
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
			redirectUrl: process.env.KAKAO_REDIRECT_URL,
		},
	},
});
