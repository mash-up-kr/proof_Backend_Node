import { Controller, Delete, Get, Header, HttpCode, Post, Redirect, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { GetUserInfoDto } from '../users/dto/get-user-info.dto';
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
	async kakaoLoginCallback(@Req() userData) {
		const user: GetUserInfoDto = await this.authService.createKakaoUser(userData.user as UserKakaoDto);
		return this.authService.login(user);
	}

	@UseGuards(JwtRefreshGuard)
	@Post('token-refresh')
	async refreshToken(@Req() userData) {
		return await this.authService.refresh(userData.user);
	}

	@UseGuards(JwtAuthGuard)
	@Post('logout')
	async logout(@Req() userData) {
		await this.authService.logout(userData.user.id);
	}
}
