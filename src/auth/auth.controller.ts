import { Controller, Get, Header, HttpCode, Redirect, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UserKakaoDto } from './dto/user.kakao.dto';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Get('kakaoLogin')
	@Header('Content-Type', 'text/html')
	@Redirect(
		`https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.KAKAO_CLIENT_ID}&redirect_uri=${process.env.KAKAO_REDIRECT_URL}`,
		301,
	)
	getKakaoLoginPage(): boolean {
		return true;
	}

	@UseGuards(AuthGuard('kakao'))
	@Get('/kakao/redirect')
	@HttpCode(200)
	async kakaoLoginCallback(@Req() userData): Promise<boolean> {
		// (userData.user as UserKakaoDto)에 사용자 정보
		return true;
	}
}
