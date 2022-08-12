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
			light: this.#decideThreshold(reviewOfDrink.light) ? 'Light' : 'Heavy',
			sweet: this.#decideThreshold(reviewOfDrink.sweet) ? 'Sweet' : 'Bitter',
			mild: this.#decideThreshold(reviewOfDrink.mild) ? 'Mild' : 'Strong',
			smooth: this.#decideThreshold(reviewOfDrink.smooth) ? 'Smooth' : 'Burning',
			taste: reviewOfDrink.taste,
		};
	}
}
