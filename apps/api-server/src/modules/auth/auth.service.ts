import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { JwtConfig } from '@src/config/config.constant';
import { UsersProfile } from '@src/entities/users-profile.entity';
import { User } from '@src/entities/users.entity';
import { DEFAULT_USER_PROFILE } from '../users-profile/users-profile.constants';
import { UserResponseDto } from '../users/dto/user-response.dto';
import { AuthReseponseDto } from './dto/auth-response.dto';
import { TokenDto } from './dto/auth.token.dto';
import { UserKakaoDto } from './dto/users.kakao.dto';

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

	async createKakaoUser(kakaoUserData: UserKakaoDto): Promise<UserResponseDto> {
		console.log(kakaoUserData);
		let kakaoUser = await this.usersRepository
			.createQueryBuilder('user')
			.select(['user.id', 'user.name', 'user.nickname', 'user.email', 'profile.id', 'profile.image_url'])
			.leftJoin('user.profile', 'profile')
			.where('user.social_id = :social_id AND user.type = :type', {
				social_id: kakaoUserData.kakaoId,
				type: 'kakao',
			})
			.getOne();

		if (kakaoUser) return kakaoUser;
		else {
			console.log(DEFAULT_USER_PROFILE);
			const defaultUserProfileUrl = DEFAULT_USER_PROFILE;

			const defaultUserProfile = await this.usersProfileRepository
				.createQueryBuilder('users_profile')
				.select(['users_profile.id', 'users_profile.image_url'])
				.where('users_profile.image_url = :image_url', {
					image_url: defaultUserProfileUrl,
				})
				.getOne();

			kakaoUser = await this.usersRepository.save({
				name: kakaoUserData.name,
				nickname: kakaoUserData.name,
				email: kakaoUserData.email,
				social_id: kakaoUserData.kakaoId,
				type: 'kakao',
				profile: defaultUserProfile,
			});
			return new AuthReseponseDto(kakaoUser);
		}
	}

	async login(user: UserResponseDto): Promise<TokenDto> {
		const payload = { id: user.id };
		const accessToken = this.jwtService.sign(payload, {
			secret: this.#jwtConfig.jwtAccessTokenSecret,
			expiresIn: this.#jwtConfig.jwtAccessTokenExpire,
		});
		const refreshToken = this.jwtService.sign(payload, {
			secret: this.#jwtConfig.jwtRefreshTokenSecret,
			expiresIn: this.#jwtConfig.jwtRefreshTokenExpire,
		});

		return {
			accessToken: accessToken,
			refreshToken: refreshToken,
			user: user,
		};
	}

	async refresh(payload: any) {
		const newAccessToken = this.jwtService.sign(payload, {
			secret: this.#jwtConfig.jwtAccessTokenSecret,
			expiresIn: this.#jwtConfig.jwtAccessTokenExpire,
		});
		return { accessToken: newAccessToken };
	}

	async getUserIdIfExist(id: number) {
		const user = await this.usersRepository.findOne({
			where: { id },
		});

		if (user) {
			return { id: user.id };
		} else throw new UnauthorizedException();
	}

	async logout(id: number) {
		return 'Logout user';
	}
}
