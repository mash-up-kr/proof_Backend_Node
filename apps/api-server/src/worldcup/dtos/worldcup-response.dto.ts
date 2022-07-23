import { Worldcup } from '../worldcup.entity';
import { WorldcupRoundDto } from './worldcup-round.dto';

export class WorldcupReseponseDto {
	id: number;
	withWho: object;
	situatoin: object;
	round: WorldcupRoundDto[];

	static from(worldcup: Worldcup) {
		const worldcupResponse = new WorldcupReseponseDto();

		worldcupResponse.id = worldcup.id;
		worldcupResponse.round = worldcup.round;
		worldcupResponse.withWho = {
			code: worldcup.withWhoCode,
			title: worldcup.withWhoTitle,
			content: worldcup.withWhoContent,
		};
		worldcupResponse.situatoin = {
			code: worldcup.situatoinCode,
			title: worldcup.situatoinTitle,
			content: worldcup.situatoinContent,
		};

		return worldcupResponse;
	}
}
