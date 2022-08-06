import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { ApiDocs } from './reviews.docs';

@Controller('reviews')
@ApiTags('Reviews')
export class ReviewsController {
	constructor(private readonly reviewsService: ReviewsService) {}

	// @Post()
	// @ApiDocs.createReviews('리뷰 생성')
	// async createReviews(@Body() createReviewDto: CreateReviewDto) {
	// 	return this.reviewsService.createReviews(createReviewDto);
	// }

	// @Get('/user/:id')
	// @ApiDocs.findReviewsByUser('사용자가 작성한 리뷰들 조회')
	// async findReviewsByUser(@Param('id') id: string) {
	// 	return this.reviewsService.findReviewsByUser(+id);
	// }

	@Get('/:id')
	@ApiDocs.findReviewsById('리뷰 상세 조회')
	async findReviewsById(@Param('id') id: string) {
		return this.reviewsService.findReviewsById(+id);
	}
}
