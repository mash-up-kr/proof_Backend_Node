import { Body, Controller, Get, Put, Req, UseGuards } from '@nestjs/common';

import { User } from '@src/entities/users.entity';
import { JwtAuthGuard } from '@src/modules/auth/guards/jwt-auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
	constructor(private readonly usersSerivce: UsersService) {}

	@Put()
	async updateUser(@Req() userData, @Body() updateUserDto: UpdateUserDto) {
		return await this.usersSerivce.updateUser(userData.user.id, updateUserDto);
	}

	// XXX: This is just test code. Plz delete later.
	@Get('/test')
	async test(@Req() userData) {
		const user: User = await this.usersSerivce.test(userData.user.id);
		return { user };
	}
}
