import { ApiProperty } from '@nestjs/swagger';

import { DrinkCardResponseDto } from '@src/modules/drinks/dto/drink-card-response.dto';
import { ReviewItemResponseDto } from './review-item-response.dto';

export class ReviewCardResponseDto {
	@ApiProperty({ description: '해당 술 정보' })
	drink: DrinkCardResponseDto;

	@ApiProperty({ description: '사용자가 작성한 리뷰 정보' })
	userReview: ReviewItemResponseDto;

	constructor(reviewOfDrink) {
		this.drink = new DrinkCardResponseDto(reviewOfDrink.reviewed_drink);
		this.userReview = new ReviewItemResponseDto(reviewOfDrink);
	}
}
