import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Category } from '@src/drinks-category/drinks-category.types';
import { DrinksService } from './drinks.service';
import { CreateDrinkDto } from './dtos/drink.dto';

@ApiTags('drinks - 술 상세 정보')
@Controller('drinks')
export class DrinksController {
	constructor(private readonly drinksService: DrinksService) {}

	// TODO: Check if the drink already exists
	// XXX: Discuss with the team how to check the drink already exists
	@Post()
	@ApiOperation({
		summary: 'Add new drink data',
		description: 'This endpoint will used by admin(dev team) to adds new drink data to the database.',
	})
	createDrinkInfo(@Body() createDrinkDto: CreateDrinkDto) {
		return this.drinksService.create(createDrinkDto);
	}

	@Get()
	public async findByCategory(@Query('category') category: Category) {
		if (!category) {
			return await this.drinksService.findAll();
		}
		return await this.drinksService.findByCategory(category);
	}

	@Get(':id')
	public async findById(@Param('id') id: string) {
		return await this.drinksService.findById(id);
	}
}
