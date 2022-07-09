import { Controller, Get, Header, HttpCode, Redirect, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Get('/kakao/login')
	@Header('Content-Type', 'text/html')
	@Redirect()
	getKakaoLoginPage() {
		const kakaoCallbackUrl: string = this.authService.getKakaoLoginPage();
		return {
			url: kakaoCallbackUrl,
		};
	}

	@UseGuards(AuthGuard('kakao'))
	@Get('/kakao/callback')
	@HttpCode(200)
	async kakaoLoginCallback(@Req() userData): Promise<boolean> {
		// (userData.user as UserKakaoDto)에 사용자 정보
		return true;
	}
}
