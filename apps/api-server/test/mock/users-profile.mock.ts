export const mockUsersProfile = {
	id: '40118a2e-dc89-46de-bbb0-46b8ac0c6846',
	image_url: 'https://zuzu-resource.s3.ap-northeast-2.amazonaws.com/drinks-category/category_beer.png',
};

export class MockUsersProfileRepository {
	save = jest.fn().mockResolvedValue(mockUsersProfile);

	async find() {
		return mockUsersProfile;
	}
}
