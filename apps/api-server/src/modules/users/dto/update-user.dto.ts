import { IsOptional, IsString } from 'class-validator';

import { UpdateUserProfileRequestDto } from '../../users-profile/dto/update-user-profile-request.dto';

export class UpdateUserDto {
	@IsOptional()
	@IsString()
	readonly nickname: string;

	@IsOptional()
	readonly profile: UpdateUserProfileRequestDto;
}
