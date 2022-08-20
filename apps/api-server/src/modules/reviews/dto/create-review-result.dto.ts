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

	isHeavy: string;

	isBitter: string;

	isStrong: string;

	isBurning: string;

	constructor(review) {
		super(review);
		this.weather = review.weather;
		this.time = review.time;
		this.companion = review.companion;
		this.mood = review.mood;
		this.taste = review.taste;
		this.isHeavy = this.#decideThreshold(review.isHeavy) ? 'Light' : 'Heavy';
		this.isBitter = this.#decideThreshold(review.isBitter) ? 'Sweet' : 'Bitter';
		this.isStrong = this.#decideThreshold(review.isStrong) ? 'Mild' : 'Strong';
		this.isBurning = this.#decideThreshold(review.isBurning) ? 'Smooth' : 'Burning';
		if (review.spot) this.spot = review.spot;
		if (review.pairing) this.pairing = review.pairing;
	}
}
