import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { QueryResult, Repository } from 'typeorm';

import { Drink } from '@src/entities/drinks.entity';
import { CreateDrinkDto } from './dto/create-drink.dto';
import { GetDrinkInfoDto } from './dto/get-drink-info.dto';

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

	public async findDrinkById(id: number): Promise<GetDrinkInfoDto> {
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
				throw new BadRequestException();
			}
			return drinkInfo;
		} catch (error) {
			throw new InternalServerErrorException(error.message, error);
		}
	}

	public async findDrinksByCategory(
		category: string,
		offset = 0,
		length = 30,
	): Promise<{ count: number; list: Drink[] }> {
		try {
			let queryBuilder = this.drinkRepository.createQueryBuilder('drink');

			if (category !== 'All') {
				queryBuilder = queryBuilder
					.leftJoin('drink.category', 'category')
					.where('category.name = :category', { category });
			}

			const count = await queryBuilder.getCount();
			const drinksByCategory = await queryBuilder
				.orderBy('drink.createdAt', 'DESC')
				.skip(offset)
				.take(length)
				.getMany();

			return { count, list: drinksByCategory };
		} catch (error) {
			throw new InternalServerErrorException(error.message, error);
		}
	}

	public async findReviewedDrinksbyUser(userId: number): Promise<GetDrinkInfoDto[]> {
		try {
			const userReviewedDrinks = await this.drinkRepository
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
				.leftJoin('drink.reviews', 'review')
				.where('review.reviewer_id = :id', { id: userId })
				.getMany();
			return userReviewedDrinks;
		} catch (error) {
			throw new InternalServerErrorException(error.message, error);
		}
	}
}
