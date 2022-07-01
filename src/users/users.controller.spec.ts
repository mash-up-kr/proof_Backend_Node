import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

const mockUser = {
	id: '40118a2e-dc89-46de-bbb0-46b8ac0c6846',
	createdAt: '2022-07-01T01:43:24.252Z',
	updatedAt: '2022-07-01T01:43:24.252Z',
	deletedAt: null,
	email: 'testtest@email.com',
	name: 'test chung',
	password: '12345',
};
class MockUsersRepository {
	save = jest.fn().mockResolvedValue(mockUser);

	async find() {
		return mockUser;
	}
}

describe('UsersController', () => {
	let controller: UsersController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [UsersController],
			providers: [
				UsersService,
				{
					provide: getRepositoryToken(User),
					useClass: MockUsersRepository,
				},
			],
		}).compile();

		controller = module.get<UsersController>(UsersController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
