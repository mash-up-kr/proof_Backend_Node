import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DrinksCategory } from './drinks-category.entity';

@Injectable()
export class DrinksCategoryService {
	constructor(
		@InjectRepository(DrinksCategory)
		private readonly drinksCategoryRepository: Repository<DrinksCategory>,
	) {}

	async findAll(): Promise<DrinksCategory[]> {
		try {
			const drinksCategorys = await this.drinksCategoryRepository.find();
			return drinksCategorys;
		} catch (error) {
			throw new Error();
		}
	}
}
