import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { MockDrinksCategoryRepository } from '../../../test/mock/drinks-category.mock';
import { DrinksCategoryController } from './drinks-category.controller';
import { DrinksCategoryService } from './drinks-category.service';
import { DrinksCategory } from '@src/entities/drinks-category.entity';

describe('DrinksCategoryController', () => {
	let controller: DrinksCategoryController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [DrinksCategoryController],
			providers: [
				DrinksCategoryService,
				{
					provide: getRepositoryToken(DrinksCategory),
					useClass: MockDrinksCategoryRepository,
				},
			],
		}).compile();

		controller = module.get<DrinksCategoryController>(DrinksCategoryController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
