import { Controller, Get, Header, Res } from '@nestjs/common';

import { AppService } from './app.service';

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Get()
	getHello(): string {
		return this.appService.getHello();
	}

	@Get('kakaoLogin')
	@Header('Content-Type', 'text/html')
	getKakaoLoginPage(@Res() res): string {
		const _redirectUrl = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.KAKAO_CLIENT_ID}&redirect_uri=${process.env.KAKAO_REDIRECT_URL}`;
		return res.redirect(_redirectUrl);
	}
}
