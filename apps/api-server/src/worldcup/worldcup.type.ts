import { ApiProperty } from '@nestjs/swagger';

export class WorldcupCondition {
	@ApiProperty({ description: '해당 항목을 나타내는 코드' })
	code: string;

	@ApiProperty({ description: '해당 항목의 제목' })
	title: string;

	@ApiProperty({ description: '해당 항목 설명' })
	content: string;
}

export class WorldcupRound {
	@ApiProperty({ description: '라운드의 컨셉' })
	title: string;

	@ApiProperty({ description: '라운드 수' })
	count: number;
}
