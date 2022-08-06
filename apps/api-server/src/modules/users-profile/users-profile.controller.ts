import { Controller, Get, UseGuards } from '@nestjs/common';

import { UsersProfileService } from './users-profile.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('users-profile')
@UseGuards(JwtAuthGuard)
export class UsersProfileController {
	constructor(private readonly usersProfileService: UsersProfileService) {}

	@Get()
	async findAll() {
		return await this.usersProfileService.findAll();
	}
}
