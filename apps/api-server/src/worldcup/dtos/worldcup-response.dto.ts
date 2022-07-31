import { ApiProperty } from '@nestjs/swagger';
import { Worldcup } from '../worldcup.entity';
import { WorldcupCondition, WorldcupRound } from '../worldcup.type';

export class WorldcupReseponseDto {
	@ApiProperty({ description: '월드컵 id' })
	id: number;

	@ApiProperty({ description: '월드컵 - 누구와 함께 술을 마시는지' })
	withWho: WorldcupCondition;

	@ApiProperty({ description: '월드컵 - 술을 마신 상황' })
	situation: WorldcupCondition;

	@ApiProperty({ description: '몇 강으로 진행할지', type: [WorldcupRound] })
	round: WorldcupRound;

	constructor(worldcup) {
		this.id = worldcup.id;
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
