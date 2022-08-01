import { Test, TestingModule } from '@nestjs/testing';
import { MockDrinksService } from '../../test/mock/drinks.mock';
import { DrinksController } from './drinks.controller';
import { DrinksService } from './drinks.service';
import { BadRequestException } from '@nestjs/common';
import { Category } from '../drinks-category/drinks-category.types';

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
					id: '64f4a1d5-e59d-4590-86dc-c0c8a0aac459',
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
			const id = 'abcdefabcdefabcdefabcdefabcdefab';
			await expect(controller.findById(id)).rejects.toThrow(BadRequestException);
		});

		it('should call drinksService.findById', async () => {
			const id = '64f4a1d5-e59d-4590-86dc-c0c8a0aac459';
			await controller.findById(id);
			expect(service.findById).toHaveBeenCalledWith(id);
			expect(await controller.findById(id)).toEqual([
				{
					id: '64f4a1d5-e59d-4590-86dc-c0c8a0aac459',
					createdAt: '2022-07-20T17:09:06.034Z',
					updatedAt: '2022-07-20T17:09:06.034Z',
					deletedAt: null,
					name: 'beer test1',
					abv: 0.1,
					origin: '🇺🇸',
					description: 'description test1',
					image_url: 'https://zuzu-resource.s3.ap-northeast-2.amazonaws.com/drinks-category/test.png',
					category: {
						name: '맥주',
					},
				},
			]);
		});
	});
});
