import { ExtractJwt, Strategy } from 'passport-jwt';

import { AuthService } from '../auth.service';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { JwtConfig } from '@src/config/config.constant';
import { PassportStrategy } from '@nestjs/passport';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh-token') {
	constructor(private readonly authService: AuthService, private readonly configService: ConfigService) {
		const jwtConfig = configService.get<JwtConfig>('jwtConfig');
		super({
			jwtFromRequest: ExtractJwt.fromBodyField('refreshToken'),
			IgnoreExpiration: false,
			secretOrKey: jwtConfig.jwtRefreshTokenSecret,
		});
	}

	async validate(payload: any) {
		return await this.authService.getUser(payload.id);
	}
}
