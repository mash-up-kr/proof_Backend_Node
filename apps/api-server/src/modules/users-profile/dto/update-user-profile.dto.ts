import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateUserProfileDto {
	@IsNotEmpty()
	@IsNumber()
	readonly id: number;
}
