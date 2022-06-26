import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigurationModule } from 'config/config.module';
import { Module } from '@nestjs/common';

@Module({
	imports: [ConfigurationModule, AuthModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
