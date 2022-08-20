import { PickType } from '@nestjs/swagger';
import { CreateReviewDto } from './create-review.dto';

export class CreateReviewResultDto extends PickType(CreateReviewDto, [
	'weather',
	'time',
	'companion',
	'mood',
	'taste',
	'spot',
	'pairing',
]) {
	#decideThreshold = (value: number): boolean => {
		return value <= 3 ? true : false;
	};

	is_heavy: string;

	is_bitter: string;

	is_strong: string;

	is_burning: string;

	constructor(review) {
		super(review);
		this.weather = review.weather;
		this.time = review.time;
		this.companion = review.companion;
		this.mood = review.mood;
		this.taste = review.taste;
		this.is_heavy = this.#decideThreshold(review.is_heavy) ? 'Light' : 'Heavy';
		this.is_bitter = this.#decideThreshold(review.is_bitter) ? 'Sweet' : 'Bitter';
		this.is_strong = this.#decideThreshold(review.is_strong) ? 'Mild' : 'Strong';
		this.is_burning = this.#decideThreshold(review.is_burning) ? 'Smooth' : 'Burning';
		if (review.spot) this.spot = review.spot;
		if (review.pairing) this.pairing = review.pairing;
	}
}
