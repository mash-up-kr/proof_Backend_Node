import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Drink } from '@src/entities/drinks.entity';
import { Repository } from 'typeorm';
import { WorldcupItemReseponseDto } from './dto/worldcup-item-response.dto';
import { WorldcupReseponseDto } from './dto/worldcup-response.dto';
import { Worldcup } from './worldcup.entity';

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

	async getWorldcupItemById(id: number, roundCount: number): Promise<any> {
		const drinks = await this.drinkRepository.find({ relations: ['category'], take: roundCount });
		return drinks.map((drink) => new WorldcupItemReseponseDto(drink));
	}
}
