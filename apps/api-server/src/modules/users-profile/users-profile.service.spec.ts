import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { UsersProfile } from '@src/entities/users-profile.entity';
import { MockUsersProfileRepository } from '../../../test/mock/users-profile.mock';
import { UsersProfileService } from './users-profile.service';

describe('UsersProfileService', () => {
	let service: UsersProfileService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				UsersProfileService,
				{
					provide: getRepositoryToken(UsersProfile),
					useClass: MockUsersProfileRepository,
				},
			],
		}).compile();

		service = module.get<UsersProfileService>(UsersProfileService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
