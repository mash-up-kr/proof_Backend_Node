import * as dotenv from 'dotenv';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { User } from './src/users/user.entity';
import { DrinksCategory } from './src/drinks-category/drinks-category.entity';

dotenv.config();
const config = {
	type: 'postgres',
	host: 'localhost',
	port: 5432,
	username: 'postgres',
	password: 'zuzu1234',
	database: 'zuzu',
	entities: [User, DrinksCategory],
	namingStrategy: new SnakeNamingStrategy(),
	synchronize: process.env.NODE_ENV !== 'prod',
	logging: process.env.NODE_ENV !== 'prod',
	dropSchema: process.env.NODE_ENV === 'test',
	autoLoadEntities: true,
	// factories: ['./data/factories/*.factory.ts'],
	// seeds: ['./data/seeds/*.seed.ts'],
	factories: ['dist/**/data/factories/*.factory.ts'],
	seeds: ['dist/**/data/seeds/*.seed.ts'],
};

console.log(config);

export = config;
