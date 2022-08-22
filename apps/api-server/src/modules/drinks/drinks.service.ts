import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Between, Repository } from 'typeorm';

import { Drink } from '@src/entities/drinks.entity';
import { WorldcupResultItem } from '@src/entities/worldcup-result-item.entity';
import { CreateDrinkDto } from './dto/create-drink.dto';
import { DrinkCardResponseDto } from './dto/drink-card-response.dto';
import { DrinkDto } from './dto/drink.dto';
import { DrinksEvaluationService } from '@src/modules/drinks-evaluation/drinks-evaluation.service';

@Injectable()
export class DrinksService {
	constructor(
		private readonly drinksEvaluationService: DrinksEvaluationService,
		@InjectRepository(Drink) private readonly drinkRepository: Repository<Drink>,
		@InjectRepository(WorldcupResultItem)
		private readonly worldcupResultItemRepository: Repository<WorldcupResultItem>,
	) {}

	// TODO
	create(createDrinkDto: CreateDrinkDto) {
		return 'This action adds a new drink';
	}

	public async findAllDrinks(): Promise<DrinkCardResponseDto[]> {
		try {
			const drinks = await this.drinkRepository
				.createQueryBuilder('drink')
				.select(['drink', 'category.name'])
				.leftJoin('drink.category', 'category')
				.orderBy('drink.createdAt', 'DESC')
				.getMany();

			const drinksDto = drinks.map((drink) => {
				const drinkDto = new DrinkCardResponseDto(drink);
				drinkDto.situation = this.drinksEvaluationService.findMainSituations(drink.reviewResult);
				return drinkDto;
			});

			return drinksDto;
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
			drinkDto.worldcupSemiFinalCount = await this.worldcupResultItemRepository.countBy({
				drinkId: id,
				rankLevel: Between(1, 2),
			});

			return drinkDto;
		} catch (error) {
			throw new InternalServerErrorException(error.message, error);
		}
	}

	public async findDrinksByCategory(
		category: string,
		page = 0,
		length = 30,
	): Promise<{ totalPageCount: number; list: DrinkCardResponseDto[] }> {
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

			return {
				totalPageCount: totalPageCount,
				list: drinksByCategory.map((drink) => {
					const drinkDto = new DrinkCardResponseDto(drink);
					drinkDto.situation = this.drinksEvaluationService.findMainSituations(drink.reviewResult);
					return drinkDto;
				}),
			};
		} catch (error) {
			throw new InternalServerErrorException(error.message, error);
		}
	}

	public async getRandomDrink(): Promise<DrinkCardResponseDto> {
		try {
			const randomDrink = await this.drinkRepository
				.createQueryBuilder('drink')
				.select(['drink', 'category.name'])
				.leftJoin('drink.category', 'category')
				.orderBy('RANDOM()')
				.limit(1)
				.getOne();
			return new DrinkCardResponseDto(randomDrink);
		} catch (error) {
			throw new InternalServerErrorException(error.message, error);
		}
	}

	public async findDrinksToRecommend(): Promise<DrinkCardResponseDto[]> {
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
			return drinksToRecommend.map((drink) => {
				const drinkDto = new DrinkCardResponseDto(drink);
				drinkDto.situation = this.drinksEvaluationService.findMainSituations(drink.review_result);
				return drinkDto;
			});
		} catch (error) {
			throw new InternalServerErrorException(error.message, error);
		}
	}

	public async findReviewedDrinksbyUser(userId: number): Promise<DrinkCardResponseDto[]> {
		try {
			const userReviewedDrinks = await this.drinkRepository
				.createQueryBuilder('drink')
				.select(['drink', 'category.name'])
				.leftJoin('drink.category', 'category')
				.leftJoin('drink.reviews', 'review')
				.where('review.reviewer_id = :id', { id: userId })
				.getMany();
			return userReviewedDrinks.map((drink) => new DrinkCardResponseDto(drink));
		} catch (error) {
			throw new InternalServerErrorException(error.message, error);
		}
	}
}
