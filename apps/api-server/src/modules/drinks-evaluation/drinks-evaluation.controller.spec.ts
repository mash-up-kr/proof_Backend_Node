import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Drink } from '@src/entities/drinks.entity';
import { MockDrinksEvaluationRepository } from '../../../test/mock/drinks-evaluation.mock';
import { DrinksEvaluationController } from './drinks-evaluation.controller';
import { DrinksEvaluationService } from './drinks-evaluation.service';

describe('DrinksEvaluationController', () => {
	let controller: DrinksEvaluationController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [DrinksEvaluationController],
			providers: [
				DrinksEvaluationService,
				{
					provide: getRepositoryToken(Drink),
					useClass: MockDrinksEvaluationRepository,
				},
			],
		}).compile();

		controller = module.get<DrinksEvaluationController>(DrinksEvaluationController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
