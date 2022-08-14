import { ReviewDto } from './review.dto';

export class ReviewItemResponseDto extends ReviewDto {
	#decideThreshold = (value: number): boolean => {
		return value <= 3 ? true : false;
	};

	constructor(review) {
		super(review);
		this.id = review.id;
		this.createdAt = review.createdAt;
		this.mood = review.mood;
		this.weather = review.weather;
		this.time = review.time;
		this.is_heavy = this.#decideThreshold(review.is_heavy) ? 'Light' : 'Heavy';
		this.is_bitter = this.#decideThreshold(review.is_bitter) ? 'Sweet' : 'Bitter';
		this.is_strong = this.#decideThreshold(review.is_strong) ? 'Mild' : 'Strong';
		this.is_burning = this.#decideThreshold(review.is_burning) ? 'Smooth' : 'Burning';
		this.taste = review.taste;
	}
}
