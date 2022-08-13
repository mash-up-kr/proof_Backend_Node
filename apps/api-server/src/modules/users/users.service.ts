import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { User } from '@src/entities/users.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponseDto } from './dto/user-response.dto';

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(User)
		private readonly usersRepository: Repository<User>,
	) {}

	async getUser(id: number): Promise<UserResponseDto> {
		const user: UserResponseDto = await this.usersRepository
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
		return await this.usersRepository.update({ id }, updateUserDto);
	}

	async deleteUser(id: number) {
		await this.usersRepository.delete({ id });
	}
}
