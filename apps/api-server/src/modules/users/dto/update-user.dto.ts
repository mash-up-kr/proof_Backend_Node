import { IsOptional, IsString } from 'class-validator';

import { UpdateUserProfileDto } from './update-user-profile.dto';

export class UpdateUserDto {
	@IsOptional()
	@IsString()
	readonly nickname: string;

	@IsOptional()
	readonly profile: UpdateUserProfileDto;
}
