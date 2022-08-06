import { Controller, Get, Header, HttpCode, Post, Redirect, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthUser } from '@src/decorators/auth.decorator';
import { User } from '@src/entities/users.entity';
import { AuthService } from './auth.service';
import { UserKakaoDto } from './dto/users.kakao.dto';
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
		const user: User = await this.authService.createKakaoUser(kakaoUser as UserKakaoDto);
		return this.authService.login(user);
	}

	@UseGuards(JwtRefreshGuard)
	@Post('token-refresh')
	async refreshToken(@AuthUser() user) {
		return await this.authService.refresh(user);
	}
}
