import { IsNumber, IsString, IsUUID } from 'class-validator';

import { GetUserProfileInfoDto } from '@src/modules/users-profile/dto/get-user-profile-info.dto';

export class GetUserInfoDto {
	@IsUUID()
	readonly id: string;

	@IsString()
	readonly name: string;

	@IsString()
	readonly nickname: string;

	@IsString()
	readonly email: string;

	@IsNumber()
	readonly social_id: number;

	@IsString()
	readonly type: string;

	readonly profile: GetUserProfileInfoDto;
}
