import { Controller, Get, Req, UseGuards } from '@nestjs/common';

import { User } from '@src/entities/users.entity';
import { JwtAuthGuard } from '@src/modules/auth/guards/jwt-auth.guard';
import { UsersService } from './users.service';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
	constructor(private readonly usersSerivce: UsersService) {}
}
