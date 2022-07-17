import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtConfig, OauthConfig } from '@src/config/config.constant';

import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { TokenSchema } from '@src/interfaces/auth.interface';
import { User } from './entities/users.entity';
import { UserKakaoDto } from './dtos/users.kakao.dto';
import { hash } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
	constructor(
		@InjectRepository(User)
		private readonly usersRepository: Repository<User>,
		private readonly configService: ConfigService,
		private readonly jwtService: JwtService,
	) {}
	oauthConfig = this.configService.get<OauthConfig>('oauthConfig').kakao;
	jwtConfig = this.configService.get<JwtConfig>('jwtConfig');

	getKakaoLoginPage(): string {
		return `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${this.oauthConfig.clientId}&redirect_uri=${this.oauthConfig.callbackUrl}`;
	}

	async createKakaoUser(kakaoUserData: UserKakaoDto): Promise<User> {
		let kakaoUser = await this.usersRepository.findOne({
			where: { social_id: kakaoUserData.kakaoId, type: 'kakao' },
		});

		if (!kakaoUser) {
			// 신규 유저
			const newKakaoUser = this.usersRepository.create({
				name: kakaoUserData.name,
				nickname: kakaoUserData.name,
				email: kakaoUserData.email,
				social_id: kakaoUserData.kakaoId,
				type: 'kakao',
			});

			kakaoUser = await this.usersRepository.save(newKakaoUser); // db에 만들어진 객체를 저장
			return kakaoUser;
		} else {
			// 기존 유저
			return kakaoUser;
		}
	}

	async login(user: User): Promise<TokenSchema> {
		const payload = { userId: user.id };
		const accessToken = this.jwtService.sign(payload, {
			secret: this.jwtConfig.jwtAccessTokenSecret,
			expiresIn: this.jwtConfig.jwtAccessTokenExpire,
		});
		const refreshToken = this.jwtService.sign(payload, {
			secret: this.jwtConfig.jwtRefreshTokenSecret,
			expiresIn: this.jwtConfig.jwtRefreshTokenExpire,
		});

		await this.setRefreshToken(refreshToken, user.id);

		const resultUser: User = await this.usersRepository.findOne({
			where: { id: user.id },
		});

		return {
			accessToken: accessToken,
			refreshToken: refreshToken,
			user: resultUser,
		};
	}

	async refresh(payload: any) {
		const newAccessToken = this.jwtService.sign(payload, {
			secret: this.jwtConfig.jwtAccessTokenSecret,
			expiresIn: this.jwtConfig.jwtAccessTokenExpire,
		});
		return { accessToken: newAccessToken };
	}

	// user refresh token update
	async setRefreshToken(refreshToken: string, id: string) {
		const user = await this.usersRepository.findOne({
			where: { id },
		});
		const currentHashedRefreshToken = await hash(refreshToken, 10);
		user.refreshToken = currentHashedRefreshToken;
		await this.usersRepository.save(user);
	}

	async getUserIfRefreshTokenMatches(id: string) {
		const user = await this.usersRepository.findOne({
			where: { id },
		});

		if (user) {
			return { userId: user.id };
		} else throw new UnauthorizedException();
	}

	async removeRefreshToken(id: string) {
		const user = await this.usersRepository.findOne({
			where: { id },
		});
		user.refreshToken = null;
		return this.usersRepository.save(user);
	}
}
