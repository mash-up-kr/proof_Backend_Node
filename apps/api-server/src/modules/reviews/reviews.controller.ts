import { Controller, Get, Post, Body, Param, UseGuards, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { ApiDocs } from './reviews.docs';
import { User } from '@src/entities/users.entity';
import { AuthUser } from '@src/decorators/auth.decorator';
import { JwtAuthGuard } from '@src/modules/auth/guards/jwt-auth.guard';

@Controller('reviews')
@ApiTags('Reviews')
@UseGuards(JwtAuthGuard)
export class ReviewsController {
	constructor(private readonly reviewsService: ReviewsService) {}

	@Post('/drinks/:drinkId')
	@ApiDocs.createReview('리뷰 생성')
	async createReview(
		@AuthUser() user: User,
		@Param('drinkId') drinkId: number,
		@Body() createReviewDto: CreateReviewDto,
	) {
		return await this.reviewsService.createReview(user.id, drinkId, createReviewDto);
	}

	@Get('/drinks/:drinkId')
	@ApiDocs.findReviewsOfDrink('나의 술 저장고 - 리뷰한 술 - 리뷰 카드들')
	async findReviewsOfDrink(
		@AuthUser() user: User,
		@Query('drinkId') drinkId: number,
		@Query('page') page: number,
		@Query('length') length: number,
	) {
		return await this.reviewsService.findReviewsOfDrink(user.id, drinkId, page, length);
	}

	@Get('/:reviewCardId')
	@ApiDocs.findReviewsById('리뷰 상세 조회 - 리뷰 카드에 보여줄 것')
	async findReviewsById(@Param('reviewCardId') id: string) {
		return await this.reviewsService.findReviewsById(+id);
	}
}
