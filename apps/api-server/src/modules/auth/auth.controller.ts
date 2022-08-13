import { Body, Controller, Get, HttpCode, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AuthUser } from '@src/decorators/auth.decorator';
import { UserResponseDto } from '../users/dto/user-response.dto';
import { ApiDocs } from './auth.docs';
import { AuthService } from './auth.service';
import { KakaoUserDto } from './dto/kakao-user.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { JwtRefreshGuard } from './guards/jwt-refresh-auth.guard';
import { KakaoAuthGuard } from './guards/kakao-auth.guard';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@UseGuards(KakaoAuthGuard)
	@Get('/kakao-login')
	@HttpCode(200)
	@ApiDocs.kakaoLogin('회원가입&로그인 후 유저 정보, 토큰 반환')
	async kakaoLogin(@Body('kakaoUser') kakaoUser) {
		const user: UserResponseDto = await this.authService.createKakaoUser(kakaoUser as KakaoUserDto);
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
