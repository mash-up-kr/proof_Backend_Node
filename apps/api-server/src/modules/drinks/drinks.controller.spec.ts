import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';

import { MockDrinksService } from '../../../test/mock/drinks.mock';
import { DrinksController } from './drinks.controller';
import { DrinksService } from './drinks.service';
import { Category } from '@src/types/drinks-category.types';

describe('DrinksController', () => {
	let controller: DrinksController;
	let service: DrinksService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [DrinksController],
			providers: [
				{
					provide: DrinksService,
					useFactory: () => MockDrinksService,
				},
			],
		}).compile();

		controller = module.get<DrinksController>(DrinksController);
		service = module.get<DrinksService>(DrinksService);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});

	describe('findByCategory', () => {
		it('should thorw BadRequestException Error if query is missing', async () => {
			await expect(controller.findByCategory(undefined)).rejects.toThrow(BadRequestException);
		});

		it('should thorw BadRequestException Error if query is invalid', async () => {
			const name = Category['InvalidDrinkCategory'];
			await expect(controller.findByCategory(name)).rejects.toThrow(BadRequestException);
		});

		it('should call drinksService.findByCategory', async () => {
			const name = Category['Beer'];
			await controller.findByCategory(name);
			expect(service.findByCategory).toHaveBeenCalledWith(name);
			expect(await controller.findByCategory(name)).toEqual([
				{
					id: 1,
					createdAt: '2022-07-20T17:09:06.034Z',
					updatedAt: '2022-07-20T17:09:06.034Z',
					deletedAt: null,
					name: 'beer test1',
					abv: 0.1,
					origin: '🇺🇸',
					description: 'description test1',
					image_url: 'https://zuzu-resource.s3.ap-northeast-2.amazonaws.com/drinks-category/test.png',
				},
			]);
		});
	});

	describe('findByCategory', () => {
		it('should thorw BadRequestException Error if id is invalid', async () => {
			const id = 99999;
			await expect(controller.findById(id)).rejects.toThrow(BadRequestException);
		});

		it('should call drinksService.findById', async () => {
			const id = 1;
			await controller.findById(id);
			expect(service.findById).toHaveBeenCalledWith(id);
			expect(await controller.findById(id)).toEqual([
				{
					id: 1,
					createdAt: '2022-07-20T17:09:06.034Z',
					updatedAt: '2022-07-20T17:09:06.034Z',
					deletedAt: null,
					name: 'beer test1',
					abv: 0.1,
					origin: '🇺🇸',
					description: 'description test1',
					image_url: 'https://zuzu-resource.s3.ap-northeast-2.amazonaws.com/drinks-category/test.png',
					category: {
						name: 'Beer',
					},
				},
			]);
		});
	});
});
