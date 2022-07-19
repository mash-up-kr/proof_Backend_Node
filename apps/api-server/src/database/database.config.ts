import * as dotenv from 'dotenv';

import { DrinksCategory } from '../drinks-category/drinks-category.entity';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { User } from '@src/auth/entities/users.entity';
import { databaseConfig } from '../config/config.constant';

const dbConfig = databaseConfig().databaseConfig;

dotenv.config();
const config = {
	type: 'postgres',
	host: dbConfig.host,
	port: dbConfig.port,
	username: dbConfig.username,
	password: dbConfig.password,
	database: dbConfig.dbname,
	entities: [User, DrinksCategory],
	seeds: ['apps/api-server/src/database/seeds/*.seed.ts'],
	namingStrategy: new SnakeNamingStrategy(),
	synchronize: process.env.NODE_ENV !== 'prod',
	logging: process.env.NODE_ENV !== 'prod',
	dropSchema: process.env.NODE_ENV === 'test',
};

export = config;
