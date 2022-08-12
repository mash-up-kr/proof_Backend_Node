import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { DrinksCategoryModule } from './modules/drinks-category/drinks-category.module';
import { DrinksModule } from './modules/drinks/drinks.module';
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
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
