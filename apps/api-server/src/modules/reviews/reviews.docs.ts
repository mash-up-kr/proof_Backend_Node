import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';

import { SwaggerMethodDoc } from '@src/swagger/swagger-method-doc-type';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewCardResponseDto } from './dto/review-card-response.dto';
import { ReviewsController } from './reviews.controller';

export const ApiDocs: SwaggerMethodDoc<ReviewsController> = {
	createReview(summary: string) {
		return applyDecorators(
			ApiOperation({
				summary,
				description: '리뷰 생성',
			}),
			ApiBody({
				type: CreateReviewDto,
			}),
			ApiResponse({
				status: 201,
				description: '',
				type: '',
			}),
			ApiBearerAuth('Authorization'),
		);
	},
	findReviewsOfDrink(summary: string) {
		return applyDecorators(
			ApiOperation({
				summary,
				description: '홈 - 나의 아카이브 - 술 저장소에 필요한 유저가 작성한 리뷰 클릭시 리뷰 상세 조회',
			}),
			ApiResponse({
				status: 200,
				description: '',
				type: '',
			}),
			ApiBearerAuth('Authorization'),
		);
	},
	findReviewsById(summary: string) {
		return applyDecorators(
			ApiOperation({
				summary,
				description: '리뷰 작성 - 결과 페이지 - 리뷰 등장',
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
