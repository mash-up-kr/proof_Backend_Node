import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AdminConfig, JwtConfig } from '@src/config/config.constant';
import { UsersProfile } from '@src/entities/users-profile.entity';
import { User } from '@src/entities/users.entity';
import { UserType } from '@src/types/users.types';
import { DEFAULT_USER_PROFILE } from '../users-profile/users-profile.constants';
import { UserResponseDto } from '../users/dto/user-response.dto';
import { KakaoLoginResponseDto } from './dto/kakao-login-response.dto';
import { KakaoUserDto } from './dto/kakao-user.dto';
import { TokenRefreshResponseDto } from './dto/token-refresh-response.dto';

@Injectable()
export class AuthService {
	constructor(
		@InjectRepository(User)
		private readonly usersRepository: Repository<User>,
		@InjectRepository(UsersProfile)
		private readonly usersProfileRepository: Repository<UsersProfile>,
		private readonly configService: ConfigService,
		private readonly jwtService: JwtService,
	) {}
	#jwtConfig = this.configService.get<JwtConfig>('jwtConfig');
	#adminConfig = this.configService.get<AdminConfig>('adminConfig');

	async createKakaoUser(kakaoUserData: KakaoUserDto): Promise<UserResponseDto> {
		console.log(kakaoUserData);
		let kakaoUser = await this.usersRepository.findOne({
			where: { social_id: kakaoUserData.kakaoId },
			relations: ['profile'],
		});

		if (kakaoUser) return new UserResponseDto(kakaoUser);
		else {
			const userType: UserType =
				kakaoUserData.email === this.#adminConfig.email ? UserType.Admin : UserType.Kakao;

			const defaultUserProfile = await this.usersProfileRepository
				.createQueryBuilder('users_profile')
				.select(['users_profile.id', 'users_profile.image_url'])
				.where('users_profile.image_url = :image_url', {
					image_url: DEFAULT_USER_PROFILE,
				})
				.getOne();

			kakaoUser = await this.usersRepository.save({
				name: kakaoUserData.name,
				nickname: kakaoUserData.name,
				email: kakaoUserData.email,
				social_id: kakaoUserData.kakaoId,
				type: userType,
				profile: defaultUserProfile,
			});

			return new UserResponseDto(kakaoUser);
		}
	}

	async login(user: UserResponseDto): Promise<KakaoLoginResponseDto> {
		const payload = { id: user.id };

		const jwtAccessTokenExpire: string =
			user.type === UserType.Admin
				? this.#jwtConfig.jwtAccessTokenExpireAdmin
				: this.#jwtConfig.jwtAccessTokenExpire;
		console.log(jwtAccessTokenExpire);
		const accessToken = this.jwtService.sign(payload, {
			secret: this.#jwtConfig.jwtAccessTokenSecret,
			expiresIn: jwtAccessTokenExpire,
		});
		const refreshToken = this.jwtService.sign(payload, {
			secret: this.#jwtConfig.jwtRefreshTokenSecret,
			expiresIn: this.#jwtConfig.jwtRefreshTokenExpire,
		});

		return new KakaoLoginResponseDto({
			accessToken,
			refreshToken,
			user,
		});
	}

	async refresh(user: any) {
		const payload = { id: user.id };

		const jwtAccessTokenExpire: string =
			user.type === UserType.Admin
				? this.#jwtConfig.jwtAccessTokenExpireAdmin
				: this.#jwtConfig.jwtAccessTokenExpire;

		const newAccessToken = this.jwtService.sign(payload, {
			secret: this.#jwtConfig.jwtAccessTokenSecret,
			expiresIn: jwtAccessTokenExpire,
		});
		return new TokenRefreshResponseDto({ accessToken: newAccessToken });
	}

	async getUserIdIfExist(id: number) {
		const user = await this.usersRepository.findOne({
			where: { id },
		});

		if (user) {
			return { id: user.id, type: user.type };
		} else throw new UnauthorizedException();
	}

	async logout(id: number) {
		return 'Logout user';
	}
}
