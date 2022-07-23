import { IsNumber, IsString } from 'class-validator';

export class WorldcupRoundDto {
	@IsString()
	title: string;

	@IsNumber()
	count: number;
}
