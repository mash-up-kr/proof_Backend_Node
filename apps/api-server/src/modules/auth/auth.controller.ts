import { Controller, Get, Header, HttpCode, Post, Redirect, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { GetUserInfoDto } from '../users/dto/get-user-info.dto';
import { AuthUser } from '@src/decorators/auth.decorator';
import { AuthService } from './auth.service';
import { UserKakaoDto } from './dto/users.kakao.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { JwtRefreshGuard } from './guards/jwt-refresh-auth.guard';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Get('/kakao-login')
	@Header('Content-Type', 'text/html')
	@Redirect()
	getKakaoLoginPage() {
		const kakaoCallbackUrl: string = this.authService.getKakaoLoginPage();
		return {
			url: kakaoCallbackUrl,
		};
	}

	@UseGuards(AuthGuard('kakao'))
	@Get('/kakao-callback')
	@HttpCode(200)
	async kakaoLoginCallback(@AuthUser() kakaoUser) {
		const user: GetUserInfoDto = await this.authService.createKakaoUser(kakaoUser as UserKakaoDto);
		return this.authService.login(user);
	}

	@UseGuards(JwtRefreshGuard)
	@Post('token-refresh')
	async refreshToken(@AuthUser() user) {
		return await this.authService.refresh(user);
	}

	@UseGuards(JwtAuthGuard)
	@Post('logout')
	async logout(@AuthUser() user) {
		await this.authService.logout(user.id);
	}
}
