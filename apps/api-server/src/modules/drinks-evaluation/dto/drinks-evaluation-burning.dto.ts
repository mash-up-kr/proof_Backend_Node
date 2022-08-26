import { ApiProperty } from '@nestjs/swagger';

export class DrinksEvaluationBurningDto {
	@ApiProperty({
		example: 1,
		description: '부드러운 목넘김(Smooth)으로 답한 리뷰 개수',
	})
	Smooth: number;

	@ApiProperty({
		example: 1,
		description: '화끈거리는 목넘김(Burning)으로 답한 리뷰 개수',
	})
	Burning: number;

	constructor() {
		this.Smooth = 0;
		this.Burning = 0;
	}
}
