import * as dotenv from 'dotenv';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

import { databaseConfig } from '../config/config.constant';
import { Worldcup } from '@src/worldcup/worldcup.entity';
import { DrinksCategory } from '../entities/drinks-category.entity';
import { User } from '../entities/users.entity';
import { Drink } from '../entities/drinks.entity';

const dbConfig = databaseConfig().databaseConfig;

dotenv.config();
const config = {
	type: 'postgres',
	host: dbConfig.host,
	port: dbConfig.port,
	username: dbConfig.username,
	password: `${dbConfig.password}`,
	database: dbConfig.dbname,
	entities: [User, DrinksCategory, Drink, Worldcup],
	seeds: ['apps/api-server/src/database/seeds/*.seed.ts'],
	namingStrategy: new SnakeNamingStrategy(),
	synchronize: process.env.NODE_ENV !== 'prod',
	logging: process.env.NODE_ENV !== 'prod',
	dropSchema: process.env.NODE_ENV === 'test',
};

export = config;
