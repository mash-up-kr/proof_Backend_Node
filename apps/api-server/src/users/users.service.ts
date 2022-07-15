import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(User)
		private readonly usersRepository: Repository<User>,
	) {}

	// XXX: This is just sample code. Plz delete later.
	async getUsers() {
		try {
			const users = await this.usersRepository.find();
			return users;
		} catch (error) {
			throw new Error();
		}
	}
}
