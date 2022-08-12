import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { UsersProfile } from '@src/entities/users-profile.entity';
import { GetUserProfileInfoDto } from './dto/get-user-profile-info.dto';

@Injectable()
export class UsersProfileService {
	constructor(
		@InjectRepository(UsersProfile)
		private readonly usersProfileRepository: Repository<UsersProfile>,
	) {}

	async findAll(): Promise<GetUserProfileInfoDto[]> {
		const usersProfiles = await this.usersProfileRepository.find();
		return usersProfiles;
	}
}
