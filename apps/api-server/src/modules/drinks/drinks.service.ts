import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { Drink } from '@src/entities/drinks.entity';
import { CreateDrinkDto } from './dto/create-drink.dto';
import { DrinkDto } from './dto/drink.dto';

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

	public async findAllDrinks(): Promise<Drink[]> {
		try {
			return await this.drinkRepository
				.createQueryBuilder('drink')
				.select(['drink', 'category.name'])
				.leftJoin('drink.category', 'category')
				.orderBy('drink.createdAt', 'DESC')
				.getMany();
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
			return drink;
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
			return userReviewedDrinks;
		} catch (error) {
			throw new InternalServerErrorException(error.message, error);
		}
	}
}
