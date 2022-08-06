import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { UsersProfile } from '@src/entities/users-profile.entity';

@Injectable()
export class UsersProfileService {
	constructor(
		@InjectRepository(UsersProfile)
		private readonly usersProfileRepository: Repository<UsersProfile>,
	) {}

	async findAll(): Promise<UsersProfile[]> {
		const usersProfiles = await this.usersProfileRepository.find();
		return usersProfiles;
	}
}
