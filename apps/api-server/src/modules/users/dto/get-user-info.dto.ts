import { IsNumber, IsString } from 'class-validator';
import { PrimaryGeneratedColumn } from 'typeorm';

import { GetUserProfileInfoDto } from '@src/modules/users-profile/dto/get-user-profile-info.dto';

export class GetUserInfoDto {
	@PrimaryGeneratedColumn()
	readonly id: number;

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
