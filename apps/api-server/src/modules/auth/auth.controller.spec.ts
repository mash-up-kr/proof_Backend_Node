import { Test, TestingModule } from '@nestjs/testing';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { MockUsersRepository } from '../../../test/mock/user.repository.mock';
import { User } from '../../entities/users.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('AuthController', () => {
	let controller: AuthController;
	let usersRepository: MockUsersRepository;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [AuthController],
			providers: [
				AuthService,
				JwtService,
				{
					provide: getRepositoryToken(User),
					useClass: MockUsersRepository,
				},
				{
					provide: ConfigService,
					useValue: {
						get: jest.fn((key: string) => {
							if (key === 'oauthConfig' || key === 'jwtConfig') {
								return 1;
							}
							return null;
						}),
					},
				},
			],
		}).compile();

		controller = module.get<AuthController>(AuthController);
		usersRepository = module.get(getRepositoryToken(User));
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
