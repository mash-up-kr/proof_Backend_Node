import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { User } from '../../entities/users.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UsersService } from './users.service';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
	constructor(private readonly usersSerivce: UsersService) {}

	// XXX: This is just test code. Plz delete later.
	@Get('/test')
	async test(@Req() userData) {
		const user: User = await this.usersSerivce.test(userData.user.id);
		return { user };
	}
}
