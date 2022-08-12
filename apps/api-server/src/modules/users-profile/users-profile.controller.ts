import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { UsersProfileService } from './users-profile.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiDocs } from './users-profile.docs';

@Controller('users-profile')
@ApiTags('profile - 프로필사진 정보')
@UseGuards(JwtAuthGuard)
export class UsersProfileController {
	constructor(private readonly usersProfileService: UsersProfileService) {}

	@Get()
	@ApiDocs.findAll('모든 프로필사진 반환')
	async findAll() {
		return await this.usersProfileService.findAll();
	}
}
