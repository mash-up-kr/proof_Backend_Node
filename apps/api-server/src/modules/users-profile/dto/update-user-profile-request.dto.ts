import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateUserProfileRequestDto {
	@IsNotEmpty()
	@IsNumber()
	readonly id: number;
}
