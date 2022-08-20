import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

import { SwaggerMethodDoc } from '@src/swagger/swagger-method-doc-type';
import { DrinksEvaluationController } from './drinks-evaluation.controller';

export const ApiDocs: SwaggerMethodDoc<DrinksEvaluationController> = {
	findDrinkEvaluation(summary: string) {
		return applyDecorators(
			ApiOperation({
				summary,
				description: '술 리뷰 기반의 평가 데이터',
			}),
			ApiResponse({
				status: 200,
				description: '',
				// type: '',
			}),
			ApiBearerAuth('Authorization'),
		);
	},
};