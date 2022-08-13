import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { UsersProfile } from '@src/entities/users-profile.entity';
import { UserProfilesResponseDto } from './dto/user-profiles-response.dto';

@Injectable()
export class UsersProfileService {
	constructor(
		@InjectRepository(UsersProfile)
		private readonly usersProfileRepository: Repository<UsersProfile>,
	) {}

	async findAll(): Promise<UserProfilesResponseDto[]> {
		const usersProfiles = await this.usersProfileRepository.find();
		return usersProfiles;
	}
}
