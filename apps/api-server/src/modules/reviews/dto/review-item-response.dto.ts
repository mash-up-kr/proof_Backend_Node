import { ApiProperty } from '@nestjs/swagger';
import { DrinkDto } from '@src/modules/drinks/dto/drink.dto';
import { ReviewDto } from './review.dto';

export class ReviewCardResponseDto {
	@ApiProperty({ description: '해당 술 정보' })
	drink: DrinkDto;

	@ApiProperty({ description: '사용자가 작성한 리뷰 정보' })
	userReview: ReviewDto;

	constructor(drink, userReview) {
		this.drink = new DrinkDto(drink);
		this.userReview = new ReviewDto(userReview);
	}
}
