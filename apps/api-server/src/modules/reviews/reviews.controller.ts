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

	@Get('/drinks')
	@ApiDocs.findReviewsOfDrink('술에 대한 유저 리뷰들 조회')
	async findReviewsOfDrink(@AuthUser() user: User, @Query('drinkId') drinkId: number) {
		return await this.reviewsService.findReviewsOfDrink(user.id, drinkId);
	}

	@Get('/:reviewCardId')
	@ApiDocs.findReviewsById('리뷰 id로 리뷰 상세 조회')
	async findReviewsById(@Param('reviewCardId') id: string) {
		return await this.reviewsService.findReviewsById(+id);
	}
}
