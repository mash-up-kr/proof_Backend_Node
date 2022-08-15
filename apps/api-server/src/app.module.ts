import { Module } from '@nestjs/common';

import * as winston from 'winston';
import { utilities as nestWinstonModuleUtilities, WinstonModule } from 'nest-winston';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { DrinksCategoryModule } from './modules/drinks-category/drinks-category.module';
import { DrinksModule } from './modules/drinks/drinks.module';
import { ReviewsModule } from './modules/reviews/reviews.module';
import { UsersModule } from './modules/users/users.module';
import { UsersProfileModule } from './modules/users-profile/users-profile.module';
import { WorldcupModule } from './modules/worldcup/worldcup.module';
@Module({
	imports: [
		ConfigModule,
		DatabaseModule,
		UsersModule,
		AuthModule,
		DrinksCategoryModule,
		DrinksModule,
		UsersProfileModule,
		WorldcupModule,
		ReviewsModule,
		WinstonModule.forRoot({
			transports: [
				new winston.transports.Console({
					level: process.env.NODE_ENV === 'prod' ? 'info' : 'debug',
					format: winston.format.combine(
						winston.format.timestamp(),
						nestWinstonModuleUtilities.format.nestLike('proof-api-server', { prettyPrint: true }),
					),
				}),
			],
		}),
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
