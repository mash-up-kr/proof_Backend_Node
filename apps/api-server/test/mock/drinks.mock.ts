import { BadRequestException } from '@nestjs/common';

import { omit } from 'lodash';

import { Category } from '@src/types/drinks-category.types';

export const mockDrinks = [
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
	{
		id: 2,
		createdAt: '2022-07-20T17:09:06.034Z',
		updatedAt: '2022-07-20T17:09:06.034Z',
		deletedAt: null,
		name: 'soju test1',
		abv: 0.1,
		origin: '🇺🇸',
		description: 'soju test1',
		image_url: 'https://zuzu-resource.s3.ap-northeast-2.amazonaws.com/drinks-category/test.png',
		category: {
			name: 'Soju',
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
		if (id === 99999) {
			throw new BadRequestException();
		} else if (id === 1) {
			return [mockDrinks[0]];
		}
	}),
	findByCategory: jest.fn((name) => {
		if (Object.values(Category).includes(name as Category)) {
			if (name === 'Beer') {
				return [omit(mockDrinks[0], 'category')];
			} else if (name === 'Soju') {
				return [omit(mockDrinks[1], 'category')];
			}
		} else {
			throw new BadRequestException();
		}
	}),
};
