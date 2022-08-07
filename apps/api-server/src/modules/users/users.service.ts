import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { User } from '@src/entities/users.entity';

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(User)
		private readonly usersRepository: Repository<User>,
	) {}

	async test(userId: number) {
		const user = await this.usersRepository.findOne({
			where: { id: userId },
		});

		return user;
	}
}
