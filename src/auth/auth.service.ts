import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { OauthConfig } from 'src/config/config.constant';

@Injectable()
export class AuthService {
	constructor(private readonly configService: ConfigService) {}
	oauthConfig = this.configService.get<OauthConfig>('oauthConfig').kakao;

	public getKakaoLoginPage(): string {
		return `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${this.oauthConfig.clientId}&redirect_uri=${this.oauthConfig.callbackUrl}`;
	}
}
