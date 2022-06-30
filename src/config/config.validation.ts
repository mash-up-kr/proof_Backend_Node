import * as Joi from 'joi';

export const configValidationSchema = Joi.object({
	NODE_ENV: Joi.string().valid('dev', 'test', 'prod').default('dev'),
	PORT: Joi.number().default(3000),
	POSTGRES_USER: Joi.string().required(),
	POSTGRES_PASSWORD: Joi.string().required(),
	POSTGRES_HOST: Joi.string().required(),
	POSTGRES_PORT: Joi.number().required(),
	POSTGRES_DB: Joi.string().required(),
	KAKAO_CLIENT_ID: Joi.string().required(),
	KAKAO_REDIRECT_URL: Joi.string().required(),
});
