import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersService } from './users.service';

// XXX: This is just sample code. Plz delete later.
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

describe('UsersService', () => {
	let usersService: UsersService;
	let usersRepository: MockUsersRepository;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				UsersService,
				{
					provide: getRepositoryToken(User),
					useClass: MockUsersRepository,
				},
			],
		}).compile();

		usersService = module.get<UsersService>(UsersService);
		usersRepository = module.get(getRepositoryToken(User));
	});

	it('UsersService should be defined', () => {
		expect(usersService).toBeDefined();
	});

	// XXX: This is just sample code. Plz delete later.
	describe('getUsers function', () => {
		it('should be defined', () => {
			expect(usersService.getUsers).toBeDefined();
			expect(usersRepository.find).toBeDefined();
		});

		it('get all users data', async () => {
			await expect(usersService.getUsers()).resolves.toEqual(mockUser);
		});
	});
});
