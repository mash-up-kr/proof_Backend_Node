import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { User } from '@src/entities/users.entity';
import { UpdateUserRequestDto } from './dto/update-user-request.dto';
import { UserResponseDto } from './dto/user-response.dto';

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(User)
		private readonly usersRepository: Repository<User>,
	) {}

	async getUser(id: number): Promise<UserResponseDto> {
		const user = await this.usersRepository.findOne({
			where: { id },
			relations: ['profile'],
		});
		return new UserResponseDto(user);
	}

	async updateUser(id: number, updateUserDto: UpdateUserRequestDto) {
		return await this.usersRepository.update({ id }, updateUserDto);
	}

	async deleteUser(id: number) {
		await this.usersRepository.delete({ id });
	}
}
