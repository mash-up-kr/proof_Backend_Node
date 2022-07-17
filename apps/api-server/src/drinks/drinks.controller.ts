import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { DrinksService } from './drinks.service';
import { CreateDrinkDto } from './dtos/create-drink.dto';
import { UpdateDrinkDto } from './dtos/update-drink.dto';

@Controller('drinks')
export class DrinksController {
	constructor(private readonly drinksService: DrinksService) {}

	@Post()
	@ApiOperation({
		summary: 'Add new drink data',
		description: 'This endpoint is used by admin(dev team) to adds new drink data to the database.',
	})
	createDrinkInfo(@Body() createDrinkDto: CreateDrinkDto) {
		// TODO: Check if the drink already exists
		// XXX: Discuss with the team how to check the drink already exists
		return this.drinksService.create(createDrinkDto);
	}

	@Get()
	@ApiOperation({
		summary: 'Get all drink data',
		description: 'This endpoint gets all detail drinks information data from the database.',
	})
	findAll() {
		return this.drinksService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.drinksService.findOne(+id);
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() updateDrinkDto: UpdateDrinkDto) {
		return this.drinksService.update(+id, updateDrinkDto);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.drinksService.remove(+id);
	}
}
