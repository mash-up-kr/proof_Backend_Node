import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { mockDrinksCategory, MockDrinksCategoryRepository } from '../../test/mock/drinks-category.mock';
import { DrinksCategory } from '../entities/drinks-category.entity';
import { DrinksCategoryService } from './drinks-category.service';

describe('DrinksCategoryService', () => {
	let drinksCategoryService: DrinksCategoryService;
	let drinksCategoryRepository: MockDrinksCategoryRepository;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				DrinksCategoryService,
				{
					provide: getRepositoryToken(DrinksCategory),
					useClass: MockDrinksCategoryRepository,
				},
			],
		}).compile();

		drinksCategoryService = module.get<DrinksCategoryService>(DrinksCategoryService);
		drinksCategoryRepository = module.get(getRepositoryToken(DrinksCategory));
	});

	it('should be defined', () => {
		expect(drinksCategoryService).toBeDefined();
	});

	describe('getDrinksCategorys function', () => {
		it('should be defined', () => {
			expect(drinksCategoryService.getDrinksCategorys).toBeDefined();
			expect(drinksCategoryRepository.find).toBeDefined();
		});

		it('get all drinksCategory data', async () => {
			await expect(drinksCategoryService.getDrinksCategorys()).resolves.toEqual(mockDrinksCategory);
		});
	});
});
