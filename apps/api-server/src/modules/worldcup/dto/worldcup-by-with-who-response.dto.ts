import { ApiProperty } from '@nestjs/swagger';
import { WorldcupConditionDto } from './worldcup.dto';

class WorldcupBySituation {
	@ApiProperty({ description: '월드컵 id' })
	worldcupId: number;

	@ApiProperty({ description: 'situation 데이터' })
	situation: WorldcupConditionDto;
}

export class WorldcupByWithWhoResponseDto {
	@ApiProperty({ description: '전체 월드컵이 지원하는 withWho코드' })
	SOLO: WorldcupBySituation;

	@ApiProperty({ description: '전체 월드컵이 지원하는 withWho코드' })
	DUO: WorldcupBySituation;
}
