import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { UsersProfile } from '@src/entities/users-profile.entity';
import { MockUsersProfileRepository } from '../../../test/mock/users-profile.mock';
import { UsersProfileController } from './users-profile.controller';
import { UsersProfileService } from './users-profile.service';

describe('UsersProfileController', () => {
	let controller: UsersProfileController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [UsersProfileController],
			providers: [
				UsersProfileService,
				{
					provide: getRepositoryToken(UsersProfile),
					useClass: MockUsersProfileRepository,
				},
			],
		}).compile();

		controller = module.get<UsersProfileController>(UsersProfileController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
