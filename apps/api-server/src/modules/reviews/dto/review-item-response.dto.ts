import { ReviewDto } from './review.dto';

export class ReviewItemResponseDto extends ReviewDto {
	#decideThreshold = (value: number): boolean => {
		return value <= 3 ? true : false;
	};

	constructor(review) {
		super(review);
		this.is_heavy = this.#decideThreshold(review.is_heavy) ? 'Light' : 'Heavy';
		this.is_bitter = this.#decideThreshold(review.is_bitter) ? 'Sweet' : 'Bitter';
		this.is_strong = this.#decideThreshold(review.is_strong) ? 'Mild' : 'Strong';
		this.is_burning = this.#decideThreshold(review.is_burning) ? 'Smooth' : 'Burning';
	}
}
