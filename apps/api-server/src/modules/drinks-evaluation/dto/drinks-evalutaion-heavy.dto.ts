import { ApiProperty } from '@nestjs/swagger';

export class DrinksEvaluationHeavyDto {
	@ApiProperty({
		example: 1,
		description: '가벼워요(Light)으로 답한 리뷰 개수',
	})
	Light: number;

	@ApiProperty({
		example: 1,
		description: '무거워요(Heavy)으로 답한 리뷰 개수',
	})
	Heavy: number;

	constructor() {
		this.Light = 0;
		this.Heavy = 0;
	}
}
