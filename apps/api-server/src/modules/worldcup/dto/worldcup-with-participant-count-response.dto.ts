import { ApiProperty } from '@nestjs/swagger';
import { WorldcupConditionDto, WorldcupRoundDto } from './worldcup.dto';

export class WorldcupWithParticipantCountReseponseDto {
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

	@ApiProperty({ description: '이 월드컵에 참여한 사람' })
	participantCount: number;

	constructor(worldcup) {
		this.id = worldcup.id;
		this.title = `${worldcup.situation_content} 날 마시고 싶은 술은?`;
		this.withWho = {
			code: worldcup.with_who_code,
			content: worldcup.with_who_content,
			title: worldcup.with_who_title,
		};
		this.situation = {
			code: worldcup.situation_code,
			content: worldcup.situation_content,
			title: worldcup.situation_title,
		};
		this.round = worldcup.round;
		this.participantCount = +worldcup.participant_count;
	}
}
