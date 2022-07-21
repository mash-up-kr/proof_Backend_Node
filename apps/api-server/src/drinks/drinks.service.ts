import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Drink } from './drink.entity';
import { DrinkInfo } from './drinks.interface';
import { CreateDrinkDto } from './dtos/drink.dto';

@Injectable()
export class DrinksService {
	constructor(
		@InjectRepository(Drink)
		private readonly drinkRepository: Repository<Drink>,
	) {}

	// TODO
	create(createDrinkDto: CreateDrinkDto) {
		return 'This action adds a new drink';
	}

	public async findAll(): Promise<Drink[]> {
		try {
			return await this.drinkRepository.find();
		} catch (error) {
			throw new InternalServerErrorException(error.message, error);
		}
	}

	public async findById(id: string): Promise<DrinkInfo> {
		try {
			const drinkInfo = await this.drinkRepository
				.createQueryBuilder('drink')
				.select([
					'drink.id',
					'drink.name',
					'drink.abv',
					'drink.origin',
					'drink.description',
					'drink.image_url',
					'category.name',
				])
				.leftJoin('drink.category', 'category')
				.where('drink.id = :id', { id })
				.getOne();

			if (!drinkInfo) {
				throw new NotFoundException();
			}
			return drinkInfo;
		} catch (error) {
			throw new InternalServerErrorException(error.message, error);
		}
	}

	public async findByCategory(category: string): Promise<Drink[]> {
		try {
			return await this.drinkRepository
				.createQueryBuilder('drink')
				.leftJoin('drink.category', 'category')
				.where('category.name = :category', { category })
				.getMany();
		} catch (error) {
			throw new InternalServerErrorException(error.message, error);
		}
	}
}
