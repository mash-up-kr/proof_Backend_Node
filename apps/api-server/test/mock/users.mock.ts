export const mockUser = {
	id: 1,
	createdAt: '2022-07-01T01:43:24.252Z',
	updatedAt: '2022-07-01T01:43:24.252Z',
	deletedAt: null,
	email: 'testtest@email.com',
	name: 'test chung',
	password: '12345',
};

export class MockUsersRepository {
	save = jest.fn().mockResolvedValue(mockUser);

	async find() {
		return mockUser;
	}
}
