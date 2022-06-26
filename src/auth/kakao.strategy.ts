import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-kakao';
import { UserKakaoDto } from './dto/user.kakao.dto';

export class KakaoStrategy extends PassportStrategy(Strategy) {
	constructor() {
		super({
			clientID: process.env.KAKAO_CLIENT_ID,
			callbackURL: process.env.KAKAO_REDIRECT_URL,
		});
	}

	async validate(accessToken, refreshToken, profile, done) {
		const profileJson = profile._json;
		const kakao_account = profileJson.kakao_account;
		const payload: UserKakaoDto = {
			name: kakao_account.profile.nickname,
			kakaoId: profileJson.id,
			email: kakao_account.has_email && !kakao_account.email_needs_agreement ? kakao_account.email : null,
		};
		done(null, payload);
	}
}
