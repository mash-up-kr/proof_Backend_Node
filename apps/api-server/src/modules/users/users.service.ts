import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { User } from '@src/entities/users.entity';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(User)
		private readonly usersRepository: Repository<User>,
	) {}

	async updateUser(id: string, updateUserDto: UpdateUserDto) {
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

	async test(id: string) {
		const user = await this.usersRepository.findOne({
			where: { id },
			relations: ['profile'],
		});

		return user;
	}
}
