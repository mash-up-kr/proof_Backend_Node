export const mockDrinksCategory = {
	id: '40118a2e-dc89-46de-bbb0-46b8ac0c6846',
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
