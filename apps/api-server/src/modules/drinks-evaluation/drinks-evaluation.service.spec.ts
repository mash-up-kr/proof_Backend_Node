import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Drink } from '@src/entities/drinks.entity';
import { MockDrinksEvaluationRepository } from '../../../test/mock/drinks-evaluation.mock';
import { DrinksEvaluationService } from './drinks-evaluation.service';

describe('DrinksEvaluationService', () => {
	let service: DrinksEvaluationService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				DrinksEvaluationService,
				{
					provide: getRepositoryToken(Drink),
					useClass: MockDrinksEvaluationRepository,
				},
			],
		}).compile();

		service = module.get<DrinksEvaluationService>(DrinksEvaluationService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
