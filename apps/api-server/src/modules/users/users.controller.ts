import { Body, Controller, Delete, Get, Put, UseGuards } from '@nestjs/common';

import { AuthUser } from '@src/decorators/auth.decorator';
import { JwtAuthGuard } from '@src/modules/auth/guards/jwt-auth.guard';
import { GetUserInfoDto } from './dto/get-user-info.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
	constructor(private readonly usersSerivce: UsersService) {}

	@Get()
	async getUser(@AuthUser() userData) {
		const user: GetUserInfoDto = await this.usersSerivce.getUser(userData.id);
		return { user };
	}

	@Put()
	async updateUser(@AuthUser() userData, @Body() updateUserDto: UpdateUserDto) {
		return await this.usersSerivce.updateUser(userData.id, updateUserDto);
	}

	@Delete()
	async deleteUser(@AuthUser() userData) {
		return await this.usersSerivce.deleteUser(userData.id);
	}
}
