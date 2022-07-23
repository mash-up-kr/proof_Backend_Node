import { Worldcup } from '../worldcup.entity';
import { WorldcupCondition, WorldcupRound } from '../worldcup.type';

export class WorldcupReseponseDto {
	id: number;
	withWho: WorldcupCondition;
	situation: WorldcupCondition;
	round: WorldcupRound[];

	static from(worldcup: Worldcup) {
		const worldcupResponse = new WorldcupReseponseDto();

		worldcupResponse.id = worldcup.id;
		worldcupResponse.round = worldcup.round;
		worldcupResponse.withWho = {
			code: worldcup.withWhoCode,
			title: worldcup.withWhoTitle,
			content: worldcup.withWhoContent,
		};
		worldcupResponse.situation = {
			code: worldcup.situationCode,
			title: worldcup.situationTitle,
			content: worldcup.situationContent,
		};

		return worldcupResponse;
	}
}
