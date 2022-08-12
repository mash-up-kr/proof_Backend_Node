import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { Review } from '@src/entities/reviews.entity';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewCardResponseDto } from './dto/review-card-response.dto';

@Injectable()
export class ReviewsService {
	constructor(@InjectRepository(Review) private readonly reviewRepository: Repository<Review>) {}

	async createReview(userId: number, drinkId: number, createReviewDto: CreateReviewDto): Promise<number> {
		try {
			const review = this.reviewRepository.create({
				...createReviewDto,
				reviewer_id: userId,
				reviewed_drink_id: drinkId,
			});
			const result = await this.reviewRepository.save(review);
			return result.id;
		} catch (error) {
			throw new InternalServerErrorException(error.message, error);
		}
	}

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
					'review.is_heavy',
					'review.is_bitter',
					'review.is_strong',
					'review.is_burning',
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
			return new ReviewCardResponseDto(reviewOfDrink);
		} catch (error) {
			throw new InternalServerErrorException(error.message, error);
		}
	}
}
