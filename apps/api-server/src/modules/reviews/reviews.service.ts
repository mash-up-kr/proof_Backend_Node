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

	async findReviewsOfDrink(
		userId: number,
		drinkId: number,
		page = 1,
		length = 1,
	): Promise<{ totalPageCount: number; reviewList: ReviewCardResponseDto[] }> {
		try {
			const queryBuilder = this.reviewRepository
				.createQueryBuilder('review')
				.leftJoinAndSelect('review.reviewed_drink', 'drink')
				.leftJoinAndSelect('drink.category', 'category')
				.where('review.reviewer_id = :id', { id: userId })
				.where('review.reviewed_drink_id = :id', { id: drinkId });

			const count = await queryBuilder.getCount();
			const totalPageCount = Math.ceil(count / length);

			const reviewsOfDrink = await queryBuilder
				.orderBy('review.createdAt', 'DESC')
				.skip((page - 1) * length)
				.take(length)
				.getMany();

			return {
				totalPageCount: totalPageCount,
				reviewList: reviewsOfDrink.map((review) => new ReviewCardResponseDto(review)),
			};
		} catch (error) {
			throw new InternalServerErrorException(error.message, error);
		}
	}

	async findReviewsById(id: number): Promise<ReviewCardResponseDto> {
		try {
			const reviewOfDrink = await this.reviewRepository
				.createQueryBuilder('review')
				.leftJoinAndSelect('review.reviewed_drink', 'drink')
				.leftJoinAndSelect('drink.category', 'category')
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
