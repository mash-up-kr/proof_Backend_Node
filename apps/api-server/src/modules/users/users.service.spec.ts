import { Test, TestingModule } from '@nestjs/testing';

import { ConfigService } from '@nestjs/config';
import { MockUsersRepository } from '../../../test/mock/users.mock';
import { User } from '../../entities/users.entity';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';

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
				{
					provide: ConfigService,
					useValue: {
						get: jest.fn((key: string) => {
							if (key === 'oauthConfig') {
								return 1;
							}
							return null;
						}),
					},
				},
			],
		}).compile();

		usersService = module.get<UsersService>(UsersService);
		usersRepository = module.get(getRepositoryToken(User));
	});

	it('UsersService should be defined', () => {
		expect(usersService).toBeDefined();
	});

	// // XXX: This is just sample code. Plz delete later.
	// describe('getUsers function', () => {
	// 	it('should be defined', () => {
	// 		expect(usersService.getUsers).toBeDefined();
	// 		expect(usersRepository.find).toBeDefined();
	// 	});

	// 	it('get all users data', async () => {
	// 		await expect(usersService.getUsers()).resolves.toEqual(mockUser);
	// 	});
	// });
});
