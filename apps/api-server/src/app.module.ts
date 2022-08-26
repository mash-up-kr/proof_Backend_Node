import { Logger, Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { DrinksCategoryModule } from './modules/drinks-category/drinks-category.module';
import { DrinksEvaluationModule } from './modules/drinks-evaluation/drinks-evaluation.module';
import { DrinksModule } from './modules/drinks/drinks.module';
import { ReviewsModule } from './modules/reviews/reviews.module';
import { UsersProfileModule } from './modules/users-profile/users-profile.module';
import { UsersModule } from './modules/users/users.module';
import { WorldcupModule } from './modules/worldcup/worldcup.module';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { HttpExceptionFilter } from './filters/http-exception.filter';

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
		DrinksEvaluationModule,
	],
	controllers: [AppController],
	providers: [
		AppService,
		Logger,
		{ provide: APP_INTERCEPTOR, useClass: LoggingInterceptor },
		{ provide: APP_FILTER, useClass: HttpExceptionFilter },
	],
})
export class AppModule {}
