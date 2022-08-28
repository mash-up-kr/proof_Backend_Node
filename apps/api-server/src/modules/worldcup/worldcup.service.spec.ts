import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Worldcup } from '@src/entities/worldcup.entity';
import { mockWorldcups, mockWorldcupsResponse } from '@api-server/test/mock/worldcup/worldcup-repository.mock';
import { Repository } from 'typeorm';
import { WorldcupService } from './worldcup.service';
import { WorldcupResult } from '@src/entities/worldcup-result.entity';
import { WorldcupResultItem } from '@src/entities/worldcup-result-item.entity';
import { Drink } from '@src/entities/drinks.entity';

describe('Worldcup Service', () => {
	let worldcupService: WorldcupService;
	let worldcupRepository: Repository<Worldcup>;
	let worldcupResultRepository: Repository<WorldcupResult>;
	let worldcupResultItemRepository: Repository<WorldcupResultItem>;
	let drinkRepository: Repository<Drink>;

	beforeEach(async () => {
		/** Mock Repository를 이용한 모듈 */
		// const module: TestingModule = await Test.createTestingModule({
		// 	providers: [ WorldcupService, {
		// 		provide: getRepositoryToken(Worldcup),
		// 		useFactory: repositoryMockFactory
		// 	}
		// 	],
		// }).compile();

		// worldcupService = module.get<WorldcupService>(WorldcupService);
		// worldcupRepository = module.get(getRepositoryToken(Worldcup))

		/** Repository 메소드의 리턴값을 mocking하는 방식 */
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				WorldcupService,
				{
					provide: getRepositoryToken(Worldcup),
					useClass: Repository,
				},
				{
					provide: getRepositoryToken(WorldcupResult),
					useClass: Repository,
				},
				{
					provide: getRepositoryToken(WorldcupResultItem),
					useClass: Repository,
				},
				{
					provide: getRepositoryToken(Drink),
					useClass: Repository,
				},
			],
		}).compile();

		worldcupService = module.get<WorldcupService>(WorldcupService);
		worldcupRepository = module.get<Repository<Worldcup>>(getRepositoryToken(Worldcup));
		worldcupResultRepository = module.get<Repository<WorldcupResult>>(getRepositoryToken(WorldcupResult));
		worldcupResultItemRepository = module.get<Repository<WorldcupResultItem>>(
			getRepositoryToken(WorldcupResultItem),
		);
		drinkRepository = module.get<Repository<Drink>>(getRepositoryToken(Drink));
	});

	it('sholud be defined', () => {
		expect(worldcupService).toBeDefined();
		expect(worldcupResultRepository).toBeDefined();
		expect(worldcupResultItemRepository).toBeDefined();
		expect(drinkRepository).toBeDefined();
	});

	describe('getWorldcups - 전체 월드컵 조회', () => {
		it('Just return all worldcups', async () => {
			jest.spyOn(worldcupRepository, 'find').mockResolvedValue(mockWorldcups);
			const worldcups = await worldcupService.getWorldcups();
			expect(worldcups).toMatchObject(mockWorldcupsResponse);
		});
	});
});
