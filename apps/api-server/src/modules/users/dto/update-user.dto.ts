import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateUserDto {
	@IsNotEmpty()
	@IsString()
	readonly nickname: string;

	@IsNotEmpty()
	@IsString()
	readonly profile_id: string;
}
