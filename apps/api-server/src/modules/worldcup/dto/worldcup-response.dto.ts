import { ApiProperty } from '@nestjs/swagger';
import { WorldcupConditionDto, WorldcupRoundDto } from './worldcup.dto';

export class WorldcupReseponseDto {
	@ApiProperty({ description: '월드컵 id' })
	id: number;

	@ApiProperty({ description: '월드컵 제목' })
	title: string;

	@ApiProperty({ description: '월드컵 - 누구와 함께 술을 마시는지' })
	withWho: WorldcupConditionDto;

	@ApiProperty({ description: '월드컵 - 술을 마신 상황' })
	situation: WorldcupConditionDto;

	@ApiProperty({ description: '몇 강으로 진행할지', type: [WorldcupRoundDto] })
	round: WorldcupRoundDto;

	constructor(worldcup) {
		this.id = worldcup.id;
		this.title = `${worldcup.situationContent} 날 마시고 싶은 술은?`;
		this.withWho = {
			code: worldcup.withWhoCode,
			content: worldcup.withWhoContent,
			title: worldcup.withWhoTitle,
		};
		this.situation = {
			code: worldcup.situationCode,
			content: worldcup.situationContent,
			title: worldcup.situationTitle,
		};
		this.round = worldcup.round;
	}
}
