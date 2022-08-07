import { Body, Controller, Delete, Get, Put, Req, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '@src/modules/auth/guards/jwt-auth.guard';
import { GetUserInfoDto } from './dto/get-user-info.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
	constructor(private readonly usersSerivce: UsersService) {}

	@Get()
	async getUser(@Req() userData) {
		const user: GetUserInfoDto = await this.usersSerivce.getUser(userData.user.id);
		return { user };
	}

	@Put()
	async updateUser(@Req() userData, @Body() updateUserDto: UpdateUserDto) {
		return await this.usersSerivce.updateUser(userData.user.id, updateUserDto);
	}

	@Delete()
	async deleteUser(@Req() userData) {
		return await this.usersSerivce.deleteUser(userData.user.id);
	}
}
