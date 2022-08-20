import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ApiDocs } from './users-profile.docs';
import { UsersProfileService } from './users-profile.service';

@Controller('users-profile')
@ApiTags('profile - 프로필사진 정보')
export class UsersProfileController {
	constructor(private readonly usersProfileService: UsersProfileService) {}

	@Get()
	@ApiDocs.findAll('모든 프로필사진 반환')
	async findAll() {
		return await this.usersProfileService.findAll();
	}
}
