import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { WorldcupItemReseponseDto } from './dto/worldcup-item-response.dto';
import { WorldcupReseponseDto } from './dto/worldcup-response.dto';
import { Drink } from '@src/entities/drinks.entity';
import { Worldcup } from '@src/entities/worldcup.entity';

@Injectable()
export class WolrdCupService {
	constructor(
		@InjectRepository(Worldcup) private readonly worldcupRepository: Repository<Worldcup>,
		@InjectRepository(Drink) private readonly drinkRepository: Repository<Drink>,
	) {}

	async getWorldcups(): Promise<WorldcupReseponseDto[]> {
		const worldcups = await this.worldcupRepository.find();
		return worldcups.map((worldcup) => new WorldcupReseponseDto(worldcup));
	}

	async getWolrdcupById(id): Promise<WorldcupReseponseDto> {
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
}
