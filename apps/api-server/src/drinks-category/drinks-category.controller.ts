import { Controller, Get } from '@nestjs/common';
import { DrinksCategoryService } from './drinks-category.service';

@Controller('drinks-category')
export class DrinksCategoryController {
	constructor(private readonly drinksCategoryService: DrinksCategoryService) {}

	@Get()
	async findAll() {
		return await this.drinksCategoryService.findAll();
	}
}
