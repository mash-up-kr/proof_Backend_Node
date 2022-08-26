import { ApiProperty } from '@nestjs/swagger';

export class DrinksEvaluationStrongDto {
	@ApiProperty({
		example: 1,
		description: '은은한 술맛(Mild)으로 답한 리뷰 개수',
	})
	Mild: number;

	@ApiProperty({
		example: 1,
		description: '찐한 술맛(Strong)으로 답한 리뷰 개수',
	})
	Strong: number;

	constructor() {
		this.Mild = 0;
		this.Strong = 0;
	}
}
