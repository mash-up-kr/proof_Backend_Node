import { ApiProperty } from '@nestjs/swagger';

export class SubmitWorldcupRequestDto {
	@ApiProperty({
		example: [2, 5, 1, 3, 6, 4, 8, 7],
	})
	drinkIds: number[];
}
