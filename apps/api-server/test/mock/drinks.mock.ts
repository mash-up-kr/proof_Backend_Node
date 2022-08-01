import { BadRequestException } from '@nestjs/common';

import { omit } from 'lodash';

import { Category } from '@src/types/drinks-category.types';

export const mockDrinks = [
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
	{
		id: '64f4a1d5-e59d-4590-86dc-c0c8a0aac460',
		createdAt: '2022-07-20T17:09:06.034Z',
		updatedAt: '2022-07-20T17:09:06.034Z',
		deletedAt: null,
		name: 'soju test1',
		abv: 0.1,
		origin: '🇺🇸',
		description: 'soju test1',
		image_url: 'https://zuzu-resource.s3.ap-northeast-2.amazonaws.com/drinks-category/test.png',
		category: {
			name: '소주',
		},
	},
];

export class MockDrinksRepository {
	save = jest.fn().mockResolvedValue(mockDrinks);

	async find() {
		return mockDrinks;
	}
}

export const MockDrinksService = {
	findAll: jest.fn(() => mockDrinks),
	findById: jest.fn((id) => {
		if (id === 'abcdefabcdefabcdefabcdefabcdefab') {
			throw new BadRequestException();
		} else if (id === '64f4a1d5-e59d-4590-86dc-c0c8a0aac459') {
			return [mockDrinks[0]];
		}
	}),
	findByCategory: jest.fn((name) => {
		if (Object.values(Category).includes(name as Category)) {
			if (name === '맥주') {
				return [omit(mockDrinks[0], 'category')];
			} else if (name === '소주') {
				return [omit(mockDrinks[1], 'category')];
			}
		} else {
			throw new BadRequestException();
		}
	}),
};
