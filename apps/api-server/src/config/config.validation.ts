import * as Joi from 'joi';

export const configValidationSchema = Joi.object({
	NODE_ENV: Joi.string().valid('dev', 'integ', 'test', 'prod').default('dev'),
	PORT: Joi.number().default(3000),
	DATABASE_USER: Joi.string().required(),
	DATABASE_PASSWORD: Joi.string().required(),
	DATABASE_HOST: Joi.string().required(),
	DATABASE_PORT: Joi.number().required(),
	DATABASE_DB: Joi.string().required(),
	ADMIN_EMAIL: Joi.string().required(),
	JWT_ACCESS_TOKEN_SECRET: Joi.string().required(),
	JWT_ACCESS_TOKEN_EXPIRATION_TIME: Joi.string().required(),
	JWT_ACCESS_TOKEN_EXPIRATION_TIME_ADMIN: Joi.string().required(),
	JWT_REFRESH_TOKEN_SECRET: Joi.string().required(),
	JWT_REFRESH_TOKEN_EXPIRATION_TIME: Joi.string().required(),
});
