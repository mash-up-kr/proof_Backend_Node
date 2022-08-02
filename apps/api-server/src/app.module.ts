import { AuthModule } from './modules/auth/auth.module';
import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './modules/users/users.module';
import { DrinksCategoryModule } from './modules/drinks-category/drinks-category.module';
import { DrinksModule } from './modules/drinks/drinks.module';
import { WorldcupModule } from './worldcup/worldcup.module';

@Module({
	imports: [
		ConfigModule,
		DatabaseModule,
		UsersModule,
		AuthModule,
		DrinksCategoryModule,
		DrinksModule,
		WorldcupModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
