import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { User } from '@src/entities/users.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { GetUserInfoDto } from './dto/get-user-info.dto';

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(User)
		private readonly usersRepository: Repository<User>,
	) {}

	async getUser(id: number): Promise<GetUserInfoDto> {
		const user: GetUserInfoDto = await this.usersRepository
			.createQueryBuilder('user')
			.select(['user.id', 'user.name', 'user.nickname', 'user.email', 'profile.id', 'profile.image_url'])
			.leftJoin('user.profile', 'profile')
			.where('user.id = :id', {
				id,
			})
			.getOne();
		return user;
	}

	async updateUser(id: number, updateUserDto: UpdateUserDto) {
		return await this.usersRepository.update(
			{ id },
			{
				nickname: updateUserDto.nickname,
				profile: {
					id: updateUserDto.profile_id,
				},
			},
		);
	}

	async deleteUser(id: number) {
		await this.usersRepository.delete({ id });
	}
}
