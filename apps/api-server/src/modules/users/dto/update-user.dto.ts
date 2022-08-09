import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateUserDto {
	@IsNotEmpty()
	@IsString()
	readonly nickname: string;

	@IsNotEmpty()
	@IsNumber()
	readonly profile_id: number;
}
