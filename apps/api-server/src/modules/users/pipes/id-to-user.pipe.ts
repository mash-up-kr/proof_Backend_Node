import { Injectable, PipeTransform } from '@nestjs/common';

import { User } from '@src/entities/users.entity';
import { UsersService } from '@src/modules/users/users.service';

/**
 * ID to user pipe
 *
 * Used to transform an user ID to the corresponding user.
 */
@Injectable()
export class IdToUserPipe implements PipeTransform<string, Promise<User>> {
	private readonly usersService: UsersService;

	public constructor(usersService: UsersService) {
		this.usersService = usersService;
	}

	public async transform(id: string): Promise<User> {
		return await this.usersService.findById(+id);
	}
}
