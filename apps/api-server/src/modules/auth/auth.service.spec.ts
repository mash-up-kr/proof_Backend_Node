import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { UsersProfile } from '@src/entities/users-profile.entity';
import { User } from '@src/entities/users.entity';
import { MockUsersProfileRepository } from '../../../test/mock/users-profile.mock';
import { MockUsersRepository } from '../../../test/mock/users.mock';
import { AuthService } from './auth.service';

describe('AuthService', () => {
	let service: AuthService;
	let usersRepository: MockUsersRepository;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				AuthService,
				JwtService,
				{
					provide: getRepositoryToken(User),
					useClass: MockUsersRepository,
				},
				{
					provide: getRepositoryToken(UsersProfile),
					useClass: MockUsersProfileRepository,
				},
				{
					provide: ConfigService,
					useValue: {
						get: jest.fn((key: string) => {
							if (key === 'jwtConfig') {
								return 1;
							}
							return null;
						}),
					},
				},
			],
		}).compile();

		service = module.get<AuthService>(AuthService);
		usersRepository = module.get(getRepositoryToken(User));
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
