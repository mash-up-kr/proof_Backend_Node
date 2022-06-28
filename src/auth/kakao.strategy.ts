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
		const kakaoAccount = profileJson.kakao_account;
		const payload: UserKakaoDto = {
			name: kakaoAccount.profile.nickname,
			kakaoId: profileJson.id,
			email: kakaoAccount.has_email && !kakaoAccount.email_needs_agreement ? kakaoAccount.email : null,
		};
		done(null, payload);
	}
}
