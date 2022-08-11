import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { Drink } from '@src/entities/drinks.entity';

import { SwaggerMethodDoc } from '@src/swagger/swagger-method-doc-type';
import { Category } from '@src/types/drinks-category.types';
import { DrinksController } from './drinks.controller';
import { GetDrinkInfoDto } from './dto/get-drink-info.dto';

export const ApiDocs: SwaggerMethodDoc<DrinksController> = {
	findAllDrinks(summary: string) {
		return applyDecorators(
			ApiOperation({
				summary,
				description: '모든 술 정보 조회',
			}),
			ApiResponse({
				status: 200,
				description: '',
				type: '',
			}),
		);
	},
	findDrinkById(summary: string) {
		return applyDecorators(
			ApiOperation({
				summary,
				description: '해당 술 살세 정보 조회',
			}),
			ApiResponse({
				status: 200,
				description: '',
				type: GetDrinkInfoDto,
			}),
		);
	},
	findDrinksByCategory(summary: string) {
		return applyDecorators(
			ApiOperation({
				summary,
				description: '카테고리별 술 정보 조회',
			}),
			ApiResponse({
				status: 200,
				description: '',
				type: '',
			}),
			ApiQuery({
				name: 'name',
				required: true,
				type: String,
				enum: Object.values(Category),
			}),
		);
	},
	findUserReviewedDrinks(summary: string) {
		return applyDecorators(
			ApiOperation({
				summary,
				description: 'Home 나의 아카이브 술 저장소에 나타날 사용자가 리뷰한 술들 조회',
			}),
			ApiResponse({
				status: 200,
				description: '',
				type: [GetDrinkInfoDto],
			}),
			ApiBearerAuth('Authorization'),
		);
	},
};
