import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { mockUser, MockUsersRepository } from '../../test/mock/user.repository.mock';
import { User } from './user.entity';
import { UsersService } from './users.service';

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
