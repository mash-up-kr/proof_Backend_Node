import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { OauthConfig } from 'src/config/config.constant';

@Injectable()
export class AuthService {
	constructor(private readonly configService: ConfigService) {}
	appConfig = this.configService.get<OauthConfig>('oauthConfig').kakao;
}
