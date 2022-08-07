export const mockDrinksCategory = {
	id: '1',
	createdAt: '2022-07-01T01:43:24.252Z',
	updatedAt: '2022-07-01T01:43:24.252Z',
	deletedAt: null,
	name: 'beer',
	image_url: 'https://zuzu-resource.s3.ap-northeast-2.amazonaws.com/drinks-category/test.png',
};

export class MockDrinksCategoryRepository {
	save = jest.fn().mockResolvedValue(mockDrinksCategory);

	async find() {
		return mockDrinksCategory;
	}
}
