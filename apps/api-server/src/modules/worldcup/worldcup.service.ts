import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { Drink } from '@src/entities/drinks.entity';
import { WorldcupResultItem } from '@src/entities/worldcup-result-item.entity';
import { WorldcupResult } from '@src/entities/worldcup-result.entity';
import { Worldcup } from '@src/entities/worldcup.entity';
import { UserParticipatedWorldcupResultDto } from './dto/user-participated-worldcup-result-response.dto';
import { WorldcupItemReseponseDto } from './dto/worldcup-item-response.dto';
import { WorldcupReseponseDto } from './dto/worldcup-response.dto';
import { WorldcupWithParticipantCountReseponseDto } from './dto/worldcup-with-participant-count-response.dto';

@Injectable()
export class WorldcupService {
	constructor(
		@InjectRepository(Worldcup) private readonly worldcupRepository: Repository<Worldcup>,
		@InjectRepository(WorldcupResult) private readonly worldcupResultRepository: Repository<WorldcupResult>,
		@InjectRepository(WorldcupResultItem)
		private readonly worldcupResultItemRepository: Repository<WorldcupResultItem>,
		@InjectRepository(Drink) private readonly drinkRepository: Repository<Drink>,
	) {}

	async getWorldcups(): Promise<WorldcupReseponseDto[]> {
		const worldcups = await this.worldcupRepository.find();
		return worldcups.map((worldcup) => new WorldcupReseponseDto(worldcup));
	}

	async getPopularWorldcup(): Promise<WorldcupWithParticipantCountReseponseDto[]> {
		const worldcups = await this.worldcupResultRepository
			.createQueryBuilder('worldcupResult')
			.select('worldcup.*, COUNT(*) as participant_count')
			.leftJoin('worldcupResult.worldcup', 'worldcup')
			.groupBy('worldcup.id')
			.orderBy('participant_count', 'DESC')
			.getRawMany();

		return worldcups.map((worldcup) => new WorldcupWithParticipantCountReseponseDto(worldcup));
	}

	async getWorldcupById(id: number): Promise<WorldcupReseponseDto> {
		const worldcup = await this.worldcupRepository.findOneBy({ id });
		if (!worldcup) {
			throw new BadRequestException('존재하지 않는 월드컵입니다.');
		}

		return new WorldcupReseponseDto(worldcup);
	}

	//@TODO: 추후 조건에 맞게 다른 술을 가져오도록 로직 추가 및 변경
	async getWorldcupItemById(id: number, roundCount: number): Promise<any> {
		const drinks = await this.drinkRepository.find({ relations: ['category'], take: roundCount });
		return drinks.map((drink) => new WorldcupItemReseponseDto(drink));
	}

	async submitWoldcupResult(worldcupId: number, drinkIds: number[], userId?: number) {
		const worldcup = await this.worldcupRepository.findOneBy({ id: worldcupId });
		if (!worldcup) {
			throw new BadRequestException('존재하지 않는 월드컵입니다.');
		}

		const worldcupResult = await this.worldcupResultRepository.save({ userId, worldcupId });

		const worldcupResultId = worldcupResult.id;
		const worldcupResultItems = drinkIds.map((drinkId, index) => {
			const rankLevel = this.#getRankLevel(index);
			return { worldcupResultId, drinkId, rankLevel };
		});

		await this.worldcupResultItemRepository.save(worldcupResultItems);
	}

	//@TODO: 현재는 한 월드컵에 내가 여러번 참여해도 참여자 수가 하나로만 카운트 됌
	async getParticipatedWorldcup(userId: number) {
		const worldcupResults = await this.worldcupResultRepository
			.createQueryBuilder('worldcup_result')
			.select('worldcup_result.*')
			.leftJoinAndSelect(
				`(${this.#getWorldcupParticipantCountQuery()})`,
				'worldcup_group',
				'worldcup_group.id = worldcup_result.worldcup_id',
			)
			.leftJoinAndSelect('worldcup_result.worldcup', 'worldcup')
			.where('worldcup_result.user_id = :userId', { userId })
			.orderBy('worldcup_result.createdAt', 'DESC')
			.getRawMany();

		await Promise.all(
			worldcupResults.map(async (worldcupResult) => {
				const winnerDrink = await this.worldcupResultItemRepository
					.createQueryBuilder('worldcup_result_item')
					.select('drink_id as id')
					.leftJoin('worldcup_result_item.worldcupResult', 'worldcup_result')
					.where('worldcup_result.user_id = :userId', { userId })
					.andWhere('worldcup_result_id = :worldcupResultId', { worldcupResultId: worldcupResult.id })
					.andWhere('rank_level = 0')
					.getRawOne();
				worldcupResult.winnerDrinkId = winnerDrink.id;
			}),
		);

		return worldcupResults.map((worldcupResult) => new UserParticipatedWorldcupResultDto(worldcupResult));
	}

	/**
	 * 1등 -> 0
	 * 2등 -> 1
	 * 3~4등 -> 2
	 * 5~8등 -> 3
	 * 9~16등 -> 4
	 * ...
	 */
	#getRankLevel(index: number, rankLevel = 0) {
		if (index >> rankLevel === 0) {
			return rankLevel;
		}

		return this.#getRankLevel(index, rankLevel + 1);
	}

	#getWorldcupParticipantCountQuery() {
		return this.worldcupResultRepository
			.createQueryBuilder('worldcup_result')
			.select('worldcup_id as id, COUNT(*) as participant_count')
			.groupBy('worldcup_result.worldcup_id')
			.getQuery();
	}
}
