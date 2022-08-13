import { HttpModule } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { UsersProfile } from '@src/entities/users-profile.entity';
import { User } from '@src/entities/users.entity';
import { MockUsersProfileRepository } from '../../../test/mock/users-profile.mock';
import { MockUsersRepository } from '../../../test/mock/users.mock';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { KakaoAuthStrategy } from './strategies/kakao-auth.strategy';

describe('AuthController', () => {
	let controller: AuthController;
	let usersRepository: MockUsersRepository;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [HttpModule],
			controllers: [AuthController],
			providers: [
				AuthService,
				JwtService,
				KakaoAuthStrategy,
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

		controller = module.get<AuthController>(AuthController);
		usersRepository = module.get(getRepositoryToken(User));
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
