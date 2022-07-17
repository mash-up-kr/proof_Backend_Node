import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { OauthConfig } from '@src/config/config.constant';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-kakao';
import { UserKakaoDto } from './dtos/user.kakao.dto';

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy) {
	constructor(private readonly configService: ConfigService) {
		const oauthConfig = configService.get<OauthConfig>('oauthConfig').kakao;
		super({
			clientID: oauthConfig.clientId,
			callbackURL: oauthConfig.callbackUrl,
		});
	}

	async validate(accessToken, refreshToken, profile, done) {
		const profileJson = profile._json;
		const kakaoAccount = profileJson.kakao_account;
		const payload: UserKakaoDto = {
			name: kakaoAccount.profile.nickname,
			kakaoId: profileJson.id,
			email: kakaoAccount.has_email && !kakaoAccount.email_needs_agreement ? kakaoAccount.email : null,
		};
		done(null, payload);
	}
}
