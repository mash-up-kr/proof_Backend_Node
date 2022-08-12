import { ApiProperty } from '@nestjs/swagger';
import { DrinkDto } from '@src/modules/drinks/dto/drink.dto';
import { ReviewDto } from './review.dto';

export class ReviewCardResponseDto {
	@ApiProperty({ description: '해당 술 정보' })
	drink: DrinkDto;

	@ApiProperty({ description: '사용자가 작성한 리뷰 정보' })
	userReview: ReviewDto;

	#decideThreshold = (value: number): boolean => {
		return value <= 3 ? true : false;
	};

	constructor(reviewOfDrink) {
		this.drink = new DrinkDto(reviewOfDrink.reviewed_drink);
		this.userReview = {
			id: reviewOfDrink.id,
			createdAt: reviewOfDrink.createdAt,
			mood: reviewOfDrink.mood,
			weather: reviewOfDrink.weather,
			time: reviewOfDrink.time,
			is_heavy: this.#decideThreshold(reviewOfDrink.is_heavy) ? 'Light' : 'Heavy',
			is_bitter: this.#decideThreshold(reviewOfDrink.is_bitter) ? 'Sweet' : 'Bitter',
			is_strong: this.#decideThreshold(reviewOfDrink.is_strong) ? 'Mild' : 'Strong',
			is_burning: this.#decideThreshold(reviewOfDrink.is_burning) ? 'Smooth' : 'Burning',
			taste: reviewOfDrink.taste,
		};
	}
}
