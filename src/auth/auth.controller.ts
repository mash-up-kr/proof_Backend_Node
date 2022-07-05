import { Controller, Get, Header, HttpCode, Redirect, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UserKakaoDto } from './dtos/user.kakao.dto';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}
	appConfig = this.authService.appConfig;

	@Get('kakaoLogin')
	@Header('Content-Type', 'text/html')
	@Redirect()
	getKakaoLoginPage() {
		return {
			url: `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${this.appConfig.clientId}&redirect_uri=${this.appConfig.callbackUrl}`,
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
