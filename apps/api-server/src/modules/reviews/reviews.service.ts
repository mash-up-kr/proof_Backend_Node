import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from '@src/entities/reviews.entity';
import { Repository } from 'typeorm';

import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewCardResponseDto } from './dto/review-item-response.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

@Injectable()
export class ReviewsService {
	constructor(@InjectRepository(Review) private readonly reviewRepository: Repository<Review>) {}

	// async createReviews(_createReviewDto: CreateReviewDto): Promise<[]> {
	// 	return 'This action adds a new review';
	// }

	// async findReviewsByUser(id: number) {
	// 	return `This action returns all reviews`;
	// }

	async findReviewsById(id: number): Promise<ReviewCardResponseDto> {
		try {
			const reviewOfDrink = await this.reviewRepository
				.createQueryBuilder('review')
				.select([
					'review.id',
					'review.createdAt',
					'review.mood',
					'review.weather',
					'review.time',
					'review.light',
					'review.sweet',
					'review.mild',
					'review.smooth',
					'review.taste',
					'drink.name',
					'drink.category',
					'drink.image_url',
					'drink.abv',
					'drink.origin',
				])
				.leftJoin('review.reviewed_drink', 'drink')
				.where('review.id = :id', { id })
				.getOne();
			if (!reviewOfDrink) {
				throw new Error('Review not found');
			}

			const drink = reviewOfDrink.reviewed_drink;
			const userReview = {
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

			return new ReviewCardResponseDto(drink, userReview);
		} catch (error) {
			throw new InternalServerErrorException(error.message, error);
		}
	}

	#decideThreshold = (value: number): boolean => {
		return value <= 3 ? true : false;
	};
}
