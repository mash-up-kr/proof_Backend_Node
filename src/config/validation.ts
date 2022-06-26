import * as Joi from 'joi';

export const configValidationSchema = Joi.object({
	NODE_ENV: Joi.string().valid('dev', 'test', 'prod').default('dev'),
	PORT: Joi.number().default(3000),
	DB_USERNAME: Joi.string().required(),
	DB_PASSWORD: Joi.string().required(),
	DB_HOST: Joi.string().required(),
	DB_PORT: Joi.number().required(),
	DB_NAME: Joi.string().required(),
});
