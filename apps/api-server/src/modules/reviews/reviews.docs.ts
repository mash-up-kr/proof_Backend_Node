import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';

import { SwaggerMethodDoc } from '@src/swagger/swagger-method-doc-type';

import { ReviewCardResponseDto } from './dto/review-item-response.dto';
import { ReviewsController } from './reviews.controller';

export const ApiDocs: SwaggerMethodDoc<ReviewsController> = {
	// createReviews(summary: string) {
	// 	return applyDecorators(
	// 		ApiOperation({
	// 			summary,
	// 			description: '리뷰 생성',
	// 		}),
	// 		ApiResponse({
	// 			status: 200,
	// 			description: '',
	// 			type: [WorldcupReseponseDto],
	// 		}),
	// 		ApiBearerAuth('Authorization'),
	// 	);
	// },
	// findReviewsByUser(summary: string) {
	// 	return applyDecorators(
	// 		ApiOperation({
	// 			summary,
	// 			description: 'Home 나의 아카이브 술 저장소에 필요한 유저가 작성한 리뷰들 조회',
	// 		}),
	// 		ApiResponse({
	// 			status: 200,
	// 			description: '',
	// 			type: WorldcupReseponseDto,
	// 		}),
	// 		ApiBearerAuth('Authorization'),
	// 	);
	// },
	findReviewsById(summary: string) {
		return applyDecorators(
			ApiOperation({
				summary,
				description: 'Home 나의 아카이브 술 저장소에 필요한 유저가 작성한 리뷰 클릭시 리뷰 상세 조회',
			}),
			ApiResponse({
				status: 200,
				description: '',
				type: ReviewCardResponseDto,
			}),
			ApiBearerAuth('Authorization'),
		);
	},
};
