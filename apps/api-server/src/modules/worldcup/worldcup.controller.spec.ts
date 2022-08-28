import { Test, TestingModule } from '@nestjs/testing';
import { mockWorldcupService } from 'apps/api-server/test/mock/worldcup.mock';
import { WorldcupController } from './worldcup.controller';
import { WorldcupService } from './worldcup.service';

describe('Drink Controller', () => {
	let controller: WorldcupController;
	let service: WorldcupService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [WorldcupController],
			providers: [
				{
					provide: WorldcupService,
					useFactory: () => mockWorldcupService,
				},
			],
		}).compile();

		controller = module.get<WorldcupController>(WorldcupController);
		service = module.get<WorldcupService>(WorldcupService);
	});
});
