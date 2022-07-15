import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { KakaoStrategy } from './kakao.strategy';
import { Module } from '@nestjs/common';

@Module({
	controllers: [AuthController],
	providers: [AuthService, KakaoStrategy],
})
export class AuthModule {}
