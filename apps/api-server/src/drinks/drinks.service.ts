import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Drink } from './drink.entity';
import { CreateDrinkDto } from './dtos/create-drink.dto';
import { UpdateDrinkDto } from './dtos/update-drink.dto';

@Injectable()
export class DrinksService {
	constructor(
		@InjectRepository(Drink)
		private readonly drinkRepository: Repository<Drink>,
	) {}

	create(createDrinkDto: CreateDrinkDto) {
		return 'This action adds a new drink';
	}

	findAll() {
		try {
			const drinks = this.drinkRepository.find();
			return drinks;
		} catch (error) {
			throw new Error();
		}
	}

	findOne(id: number) {
		return `This action returns a #${id} drink`;
	}

	update(id: number, updateDrinkDto: UpdateDrinkDto) {
		return `This action updates a #${id} drink`;
	}

	remove(id: number) {
		return `This action removes a #${id} drink`;
	}
}
