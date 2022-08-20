import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ApiDocs } from './drinks-evaluation.docs';
import { DrinksEvaluationService } from './drinks-evaluation.service';

@ApiTags('Drinks-evaluation')
@Controller('drinks-evaluation')
export class DrinksEvaluationController {
	constructor(private readonly drinksEvaluationService: DrinksEvaluationService) {}

	@Get(':id')
	@ApiDocs.findDrinkEvaluation('술 리뷰 평가')
	public async findDrinkEvaluation(@Param('id') id: number) {
		return await this.drinksEvaluationService.findDrinkEvaluation(id);
	}
}
