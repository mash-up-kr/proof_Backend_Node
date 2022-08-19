import { BadRequestException, ConsoleLogger, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { EntityManager, getManager, Repository } from 'typeorm';

import { WorldcupItemReseponseDto } from './dto/worldcup-item-response.dto';
import { WorldcupReseponseDto } from './dto/worldcup-response.dto';
import { Drink } from '@src/entities/drinks.entity';
import { Worldcup } from '@src/entities/worldcup.entity';
import { WorldcupResult } from '@src/entities/worldcup-result.entity';
import { DrinksService } from '../drinks/drinks.service';
import { WorldcupResultItem } from '@src/entities/worldcup-result-item.entity';
import { WorldcupWithParticipantCountReseponseDto } from './dto/worldcup-with-participant-count-response.dto';

@Injectable()
export class WorldcupService {
	constructor(
		@Inject(DrinksService) private readonly drinkService: DrinksService,
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
		const worldcupResult = await this.worldcupResultRepository.save({ userId, worldcupId });

		const worldcupResultId = worldcupResult.id;
		const worldcupResultItems = drinkIds.map((drinkId, index) => {
			const rankLevel = this.#getRankLevel(index);
			return { worldcupResultId, drinkId, rankLevel };
		});

		await this.worldcupResultItemRepository.save(worldcupResultItems);
	}

	//@TODO: 현재는 한 월드컵당 하나의 결과만 옴. 같은 월드컵 여러개 대응하게 수정해야함
	async getParticipatedWorldcup(userId: number) {
		const worldcups = await this.worldcupResultRepository
			.createQueryBuilder('worldcupResult')
			.select('worldcup.*, COUNT(*) as participant_count')
			.leftJoin('worldcupResult.worldcup', 'worldcup')
			.where('worldcupResult.user_id = :id', { id: userId })
			.groupBy('worldcup.id, worldcupResult.id')
			.orderBy('worldcupResult.createdAt', 'DESC')
			.getRawMany();

		return worldcups.map((worldcup) => new WorldcupWithParticipantCountReseponseDto(worldcup));
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
}
