import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Drink } from './drink.entity';
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

	public async findAll(): Promise<Drink[]> {
		try {
			return await this.drinkRepository.find();
		} catch (error) {
			throw new InternalServerErrorException(error.message, error);
		}
	}

	public async findById(id: string): Promise<GetDrinkInfoDto> {
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

	public async findByCategory(category: string): Promise<Drink[]> {
		try {
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
}
