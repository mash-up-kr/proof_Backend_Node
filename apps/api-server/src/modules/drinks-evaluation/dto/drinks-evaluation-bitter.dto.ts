import { ApiProperty } from '@nestjs/swagger';

export class DrinksEvaluationBitterDto {
	@ApiProperty({
		example: 1,
		description: '달아요(Sweet)으로 답한 리뷰 개수',
	})
	Sweet: number;

	@ApiProperty({
		example: 1,
		description: '써요(Bitter)으로 답한 리뷰 개수',
	})
	Bitter: number;

	constructor() {
		this.Sweet = 0;
		this.Bitter = 0;
	}
}
