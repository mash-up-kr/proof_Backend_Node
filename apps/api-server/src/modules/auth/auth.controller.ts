import { Controller, Get, Header, HttpCode, Post, Redirect, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';

import { GetUserInfoDto } from '../users/dto/get-user-info.dto';
import { AuthUser } from '@src/decorators/auth.decorator';
import { AuthService } from './auth.service';
import { UserKakaoDto } from './dto/users.kakao.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { JwtRefreshGuard } from './guards/jwt-refresh-auth.guard';
import { ApiDocs } from './auth.docs';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Get('/kakao-login')
	@Header('Content-Type', 'text/html')
	@Redirect()
	@ApiDocs.getKakaoLoginPage('카카오 로그인 페이지로 리디렉트')
	getKakaoLoginPage() {
		const kakaoCallbackUrl: string = this.authService.getKakaoLoginPage();
		return {
			url: kakaoCallbackUrl,
		};
	}

	@UseGuards(AuthGuard('kakao'))
	@Get('/kakao-callback')
	@HttpCode(200)
	@ApiDocs.kakaoLoginCallback('카카오 로그인에 성공하면 유저 정보, 토큰 반환')
	async kakaoLoginCallback(@AuthUser() kakaoUser) {
		const user: GetUserInfoDto = await this.authService.createKakaoUser(kakaoUser as UserKakaoDto);
		return this.authService.login(user);
	}

	@UseGuards(JwtRefreshGuard)
	@Post('token-refresh')
	@ApiDocs.refreshToken('access token 재발급')
	async refreshToken(@AuthUser() user) {
		return await this.authService.refresh(user);
	}

	@UseGuards(JwtAuthGuard)
	@Post('logout')
	@ApiDocs.logout('로그아웃')
	async logout(@AuthUser() user) {
		await this.authService.logout(user.id);
	}
}
