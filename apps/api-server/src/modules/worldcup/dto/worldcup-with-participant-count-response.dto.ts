import { ApiProperty, PickType } from '@nestjs/swagger';
import { WorldcupReseponseDto } from './worldcup-response.dto';
import { WorldcupConditionDto, WorldcupRoundDto } from './worldcup.dto';

export class WorldcupWithParticipantCountReseponseDto extends PickType(WorldcupReseponseDto, [
	'id',
	'title',
	'imageUrl',
	'withWho',
	'situation',
	'round',
	'participantCount',
] as const) {
	constructor(worldcup) {
		super();

		this.id = worldcup.id;
		this.title = worldcup.title;
		this.imageUrl = worldcup.image_url;
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
