import * as dotenv from 'dotenv';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { User } from '../users/user.entity';
import { DrinksCategory } from '../drinks-category/drinks-category.entity';

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
	namingStrategy: new SnakeNamingStrategy(),
	synchronize: process.env.NODE_ENV !== 'prod',
	logging: process.env.NODE_ENV !== 'prod',
	dropSchema: process.env.NODE_ENV === 'test',
	autoLoadEntities: true,
};

export = config;
