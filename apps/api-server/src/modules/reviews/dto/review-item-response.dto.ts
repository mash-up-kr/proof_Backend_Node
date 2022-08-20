import { ReviewDto } from './review.dto';

export class ReviewItemResponseDto extends ReviewDto {
	#decideThreshold = (value: number): boolean => {
		return value <= 3 ? true : false;
	};

	constructor(review) {
		super(review);
		this.isHeavy = this.#decideThreshold(review.isHeavy) ? 'Light' : 'Heavy';
		this.isBitter = this.#decideThreshold(review.isBitter) ? 'Sweet' : 'Bitter';
		this.isStrong = this.#decideThreshold(review.isStrong) ? 'Mild' : 'Strong';
		this.isBurning = this.#decideThreshold(review.isBurning) ? 'Smooth' : 'Burning';
	}
}
