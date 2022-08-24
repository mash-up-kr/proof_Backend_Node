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

	constructor(worldcupResult) {
		this.id = worldcupResult.id;
		this.winnerDrinkId = worldcupResult.winnerDrinkId;

		this.worldcup = new WorldcupReseponseDto({
			id: worldcupResult.worldcupId,
			title: worldcupResult.worldcupTitle,
			imageUrl: worldcupResult.worldcupImageUrl,
			withWhoCode: worldcupResult.worldcupWithWhoCode,
			withWhoContent: worldcupResult.worldcupWithWhoContent,
			withWhoTitle: worldcupResult.worldcupWithWhoTitle,
			situationCode: worldcupResult.worldcupSituationCode,
			situationContent: worldcupResult.worldcupSituationContent,
			situationTitle: worldcupResult.worldcupSituationTitle,
			round: worldcupResult.worldcupRound,
			participantCount: +worldcupResult.participantCount,
		});
	}
}
