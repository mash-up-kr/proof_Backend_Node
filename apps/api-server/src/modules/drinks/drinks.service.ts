import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { Drink } from '@src/entities/drinks.entity';
import { CreateDrinkDto } from './dto/create-drink.dto';
import { DrinkDto } from './dto/drink.dto';
import { WorldcupResultItem } from '@src/entities/worldcup-result-item.entity';

@Injectable()
export class DrinksService {
	constructor(
		@InjectRepository(Drink) private readonly drinkRepository: Repository<Drink>,
		@InjectRepository(WorldcupResultItem)
		private readonly worldcupResultItemRepository: Repository<WorldcupResultItem>,
	) {}

	// TODO
	create(createDrinkDto: CreateDrinkDto) {
		return 'This action adds a new drink';
	}

	public async findAllDrinks(): Promise<DrinkDto[]> {
		try {
			const drinks = await this.drinkRepository
				.createQueryBuilder('drink')
				.select(['drink', 'category.name'])
				.leftJoin('drink.category', 'category')
				.orderBy('drink.createdAt', 'DESC')
				.getMany();

			return drinks.map((drink) => new DrinkDto(drink));
		} catch (error) {
			throw new InternalServerErrorException(error.message, error);
		}
	}

	public async findDrinkById(id: number): Promise<DrinkDto> {
		try {
			const drink = await this.drinkRepository
				.createQueryBuilder('drink')
				.select(['drink', 'category.name'])
				.leftJoin('drink.category', 'category')
				.where('drink.id = :id', { id })
				.getOne();
			if (!drink) {
				throw new BadRequestException();
			}

			const drinkDto = new DrinkDto(drink);
			drinkDto.worldcupWinCount = await this.worldcupResultItemRepository.countBy({ drinkId: id, rankLevel: 0 });

			return drinkDto;
		} catch (error) {
			throw new InternalServerErrorException(error.message, error);
		}
	}

	public async findDrinksByCategory(
		category: string,
		page = 0,
		length = 30,
	): Promise<{ totalPageCount: number; list: DrinkDto[] }> {
		try {
			let queryBuilder = this.drinkRepository
				.createQueryBuilder('drink')
				.select(['drink', 'category.name'])
				.leftJoin('drink.category', 'category');

			if (category !== 'All') {
				queryBuilder = queryBuilder.where('category.name = :category', { category });
			}
			const count = await queryBuilder.getCount();
			const totalPageCount = Math.ceil(count / length);

			const drinksByCategory = await queryBuilder
				.orderBy('drink.createdAt', 'DESC')
				.skip((page - 1) * length)
				.take(length)
				.getMany();

			return { totalPageCount: totalPageCount, list: drinksByCategory.map((drink) => new DrinkDto(drink)) };
		} catch (error) {
			throw new InternalServerErrorException(error.message, error);
		}
	}

	public async getRandomDrink(): Promise<DrinkDto> {
		try {
			const randomDrink = await this.drinkRepository
				.createQueryBuilder('drink')
				.select(['drink', 'category.name'])
				.leftJoin('drink.category', 'category')
				.orderBy('RANDOM()')
				.limit(1)
				.getOne();
			return new DrinkDto(randomDrink);
		} catch (error) {
			throw new InternalServerErrorException(error.message, error);
		}
	}

	public async findDrinksToRecommend(): Promise<DrinkDto[]> {
		try {
			const drinksToRecommend = await this.drinkRepository
				.createQueryBuilder('drink')
				.select('drink.*, category.name as category, COUNT(*) as review_count')
				.leftJoin('drink.reviews', 'review')
				.leftJoin('drink.category', 'category')
				.groupBy('drink.id, category.name')
				.orderBy('review_count', 'DESC')
				.limit(5)
				.getRawMany();
			return drinksToRecommend.map((drink) => new DrinkDto(drink));
		} catch (error) {
			throw new InternalServerErrorException(error.message, error);
		}
	}

	public async findReviewedDrinksbyUser(userId: number): Promise<DrinkDto[]> {
		try {
			const userReviewedDrinks = await this.drinkRepository
				.createQueryBuilder('drink')
				.select(['drink', 'category.name'])
				.leftJoin('drink.category', 'category')
				.leftJoin('drink.reviews', 'review')
				.where('review.reviewer_id = :id', { id: userId })
				.getMany();
			return userReviewedDrinks.map((drink) => new DrinkDto(drink));
		} catch (error) {
			throw new InternalServerErrorException(error.message, error);
		}
	}
}
