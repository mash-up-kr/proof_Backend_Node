import { AuthModule } from './auth/auth.module';
import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { DrinksCategoryModule } from './drinks-category/drinks-category.module';
import { WorldcupModule } from './worldcup/worldcup.module';

@Module({
	imports: [ConfigModule, DatabaseModule, UsersModule, AuthModule, DrinksCategoryModule, WorldcupModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
