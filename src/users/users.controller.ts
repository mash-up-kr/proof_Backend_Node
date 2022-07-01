import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
	constructor(private readonly usersSerivce: UsersService) {}

	// XXX: This is just sample code. Plz delete later.
	@Get()
	async getUsers() {
		return await this.usersSerivce.getUsers();
	}
}
