import { Controller, Get, HttpCode, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UserKakaoDto } from './dto/user.kakao.dto';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Get('/kakao/redirect')
	@HttpCode(200)
	@UseGuards(AuthGuard('kakao'))
	async kakaoLoginCallback(@Req() req): Promise<boolean> {
		console.log(req.user as UserKakaoDto);
		return true;
	}
}
