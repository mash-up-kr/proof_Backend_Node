import { Body, Controller, Delete, Get, Put, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AuthUser } from '@src/decorators/auth.decorator';
import { JwtAuthGuard } from '@src/modules/auth/guards/jwt-auth.guard';
import { UpdateUserRequestDto } from './dto/update-user-request.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { ApiDocs } from './users.docs';
import { UsersService } from './users.service';

@Controller('users')
@ApiTags('users - 사용자 정보')
@UseGuards(JwtAuthGuard)
export class UsersController {
	constructor(private readonly usersSerivce: UsersService) {}

	@Get()
	@ApiDocs.getUser('사용자 정보 반환')
	async getUser(@AuthUser() userData) {
		const user: UserResponseDto = await this.usersSerivce.getUser(userData.id);
		return { user };
	}

	@Put()
	@ApiDocs.updateUser('사용자 정보 수정')
	async updateUser(@AuthUser() userData, @Body() updateUserDto: UpdateUserRequestDto) {
		return await this.usersSerivce.updateUser(userData.id, updateUserDto);
	}

	@Delete()
	@ApiDocs.deleteUser('회원탈퇴')
	async deleteUser(@AuthUser() userData) {
		return await this.usersSerivce.deleteUser(userData.id);
	}
}
