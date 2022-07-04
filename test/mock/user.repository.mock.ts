export const mockUser = {
	id: '40118a2e-dc89-46de-bbb0-46b8ac0c6846',
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
