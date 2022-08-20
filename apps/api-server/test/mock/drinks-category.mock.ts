export const mockDrinksCategory = {
	id: 1,
	createdAt: '2022-07-20T17:09:06.034Z',
	updatedAt: '2022-07-20T17:09:06.034Z',
	deletedAt: null,
	name: 'beer test1',
	abv: 0.1,
	origin: '미국',
	description: 'description test1',
	imageUrl: 'https://zuzu-resource.s3.ap-northeast-2.amazonaws.com/drinks-category/test.png',
	category: {
		name: 'Beer',
	},
};

export class MockDrinksCategoryRepository {
	save = jest.fn().mockResolvedValue(mockDrinksCategory);

	async find() {
		return mockDrinksCategory;
	}
}
