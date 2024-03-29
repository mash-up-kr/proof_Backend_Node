import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';

import { SwaggerMethodDoc } from '@src/swagger/swagger-method-doc-type';
import { Category } from '@src/types/drinks-category.types';
import { DrinksController } from './drinks.controller';
import { DrinkCardResponseDto } from './dto/drink-card-response.dto';

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
				type: [DrinkCardResponseDto],
			}),
		);
	},
	getRandomDrink(summary: string) {
		return applyDecorators(
			ApiOperation({
				summary,
				description:
					'홈 - 오늘의 랜덤 술 - 랜덤 술 보기와 다른 술 보기 시 무제한으로 새로운 아이템을 볼 수 있음',
			}),
			ApiResponse({
				status: 200,
				description: '',
				type: DrinkCardResponseDto,
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
				type: DrinkCardResponseDto,
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
				type: [DrinkCardResponseDto],
			}),
			ApiQuery({
				name: 'name',
				required: true,
				type: String,
				enum: Object.values(Category),
			}),
		);
	},
	findDrinksToRecommend(summary: string) {
		return applyDecorators(
			ApiOperation({
				summary,
				description: '홈 - 요즘 사람들은 어떤 술을 마실까: 리뷰 수 많은 순으로 최대 5개',
			}),
			ApiResponse({
				status: 200,
				description: '',
				type: [DrinkCardResponseDto],
			}),
		);
	},
	findUserReviewedDrinks(summary: string) {
		return applyDecorators(
			ApiOperation({
				summary,
				description: '홈 - 나의 아카이브 - 리뷰한 술 상세 목록',
			}),
			ApiResponse({
				status: 200,
				description: '',
				type: [DrinkCardResponseDto],
			}),
			ApiBearerAuth('Authorization'),
		);
	},
};
