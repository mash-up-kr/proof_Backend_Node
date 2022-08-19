import { ApiProperty } from '@nestjs/swagger';
import { WorldcupReseponseDto } from './worldcup-response.dto';
import { WorldcupConditionDto, WorldcupRoundDto } from './worldcup.dto';

export class UserParticipatedWorldcupResultDto {
	@ApiProperty({ description: '월드컵 id' })
	id: number;

	@ApiProperty({ description: '월드컵 데이터' })
	worldcup: WorldcupReseponseDto;

	@ApiProperty({ description: '해당 월드컵에서 1등했던 술' })
	winnerDrinkId: number;

	@ApiProperty({ description: '이 월드컵에 참여한 사람' })
	participantCount: number;

	constructor(worldcupResult) {
		this.id = worldcupResult.id;
		this.winnerDrinkId = worldcupResult.winnerDrinkId;

		this.worldcup = new WorldcupReseponseDto({
			id: worldcupResult.worldcup_id,
			title: `${worldcupResult.worldcup_situation_content} 날 마시고 싶은 술은?`,
			withWho: {
				code: worldcupResult.worldcup_with_who_code,
				content: worldcupResult.worldcup_with_who_content,
				title: worldcupResult.worldcup_with_who_title,
			},
			situation: {
				code: worldcupResult.worldcup_situation_code,
				content: worldcupResult.worldcup_situation_content,
				title: worldcupResult.worldcup_situation_title,
			},
			round: worldcupResult.worldcup_round,
			participantCount: +worldcupResult.participant_count,
		});
	}
}
