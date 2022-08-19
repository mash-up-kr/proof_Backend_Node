import * as dotenv from 'dotenv';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

import { databaseConfig } from '../config/config.constant';
import { DrinksCategory } from '../entities/drinks-category.entity';
import { User } from '@src/entities/users.entity';
import { UsersProfile } from '@src/entities/users-profile.entity';
import { Drink } from '@src/entities/drinks.entity';
import { Worldcup } from '@src/entities/worldcup.entity';
import { WorldcupResult } from '@src/entities/worldcup-result.entity';
import { Review } from '@src/entities/reviews.entity';

const dbConfig = databaseConfig().databaseConfig;

dotenv.config();
const config = {
	type: 'postgres',
	host: dbConfig.host,
	port: dbConfig.port,
	username: dbConfig.username,
	password: `${dbConfig.password}`,
	database: dbConfig.dbname,
	entities: [UsersProfile, User, DrinksCategory, Drink, Worldcup, WorldcupResult, Review],
	seeds: [
		'apps/api-server/src/database/seeds/users-profile.seed.ts',
		'apps/api-server/src/database/seeds/users.seed.ts',
		'apps/api-server/src/database/seeds/*.seed.ts',
	],
	namingStrategy: new SnakeNamingStrategy(),
	synchronize: process.env.NODE_ENV !== 'prod',
	logging: process.env.NODE_ENV !== 'prod',
	dropSchema: process.env.NODE_ENV === 'test',
};

export = config;
