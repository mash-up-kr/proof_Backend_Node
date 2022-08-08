import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { ApiDocs } from './reviews.docs';
import { User } from '@src/entities/users.entity';
import { IdToUserPipe } from '@src/modules/users/pipes/id-to-user.pipe';
import { GetDrinkInfoDto } from '@src/modules/drinks/dto/get-drink-info.dto';
import { IdToDrinkPipe } from '@src/modules/drinks/pipes/id-to-drink.pipe';

@Controller('reviews')
@ApiTags('Reviews')
export class ReviewsController {
	constructor(private readonly reviewsService: ReviewsService) {}

	@Post()
	@ApiDocs.createReview('리뷰 생성')
	// TODO: Fix to Auth user properly.
	async createReview(
		@Param('userid', IdToUserPipe) user: User,
		@Param('drinkid', IdToDrinkPipe) drink: GetDrinkInfoDto,
		@Body() createReviewDto: CreateReviewDto,
	) {
		return await this.reviewsService.createReview(user, drink, createReviewDto);
	}

	@Get('/:id')
	@ApiDocs.findReviewsById('리뷰 상세 조회')
	async findReviewsById(@Param('id') id: string) {
		return await this.reviewsService.findReviewsById(+id);
	}
}
