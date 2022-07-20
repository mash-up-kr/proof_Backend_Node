import { ExtractJwt, Strategy } from 'passport-jwt';

import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { JwtConfig } from '@src/config/config.constant';
import { PassportStrategy } from '@nestjs/passport';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
	constructor(private readonly configService: ConfigService) {
		const jwtConfig = configService.get<JwtConfig>('jwtConfig');
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			IgnoreExpiration: false,
			secretOrKey: jwtConfig.jwtAccessTokenSecret,
		});
	}

	async validate(payload: any) {
		return { id: payload.id };
	}
}
