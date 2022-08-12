import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

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

	public async findDrinksByCategory(category: string): Promise<Drink[]> {
		try {
			if (category === 'All') {
				return await this.findAllDrinks();
			}
			const drinksInfoByCategory = await this.drinkRepository
				.createQueryBuilder('drink')
				.leftJoin('drink.category', 'category')
				.where('category.name = :category', { category })
				.getMany();
			return drinksInfoByCategory;
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
