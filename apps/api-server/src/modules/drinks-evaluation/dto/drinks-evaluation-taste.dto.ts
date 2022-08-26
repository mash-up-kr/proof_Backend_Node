import { ApiProperty } from '@nestjs/swagger';
import { Taste } from '@src/types/reviews.types';

export class DrinksEvaluationTasteDto {
	@ApiProperty({
		enum: Taste,
		example: Taste.Fruity,
		description: '술의 느낌',
	})
	tasteName: Taste;

	@ApiProperty({
		example: 20,
		description: '해당 느낌이라 답한 리뷰들의 비율',
	})
	percent: number;

	constructor(tasteObj) {
		this.tasteName = tasteObj.tasteName;
		this.percent = tasteObj.percent;
	}
}
