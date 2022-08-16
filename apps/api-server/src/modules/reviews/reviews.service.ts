import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { Drink } from '@src/entities/drinks.entity';
import { Review } from '@src/entities/reviews.entity';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewCardResponseDto } from './dto/review-card-response.dto';

@Injectable()
export class ReviewsService {
	constructor(
		@InjectRepository(Review)
		private readonly reviewRepository: Repository<Review>,
		@InjectRepository(Drink)
		private readonly drinkRepository: Repository<Drink>,
	) {}

	async createReview(userId: number, drinkId: number, createReviewDto: CreateReviewDto): Promise<number> {
		try {
			const review = this.reviewRepository.create({
				...createReviewDto,
				reviewer_id: userId,
				reviewed_drink_id: drinkId,
			});
			const result = await this.reviewRepository.save(review);

			const reviewResultRow = await this.drinkRepository
				.createQueryBuilder('drink')
				.select(`(drink.review_result)::JSONB AS review_result`)
				.where('drink.id = :id', { id: drinkId })
				.getRawOne();

			const reviewResult = reviewResultRow.review_result;

			for (const key in createReviewDto) {
				if (reviewResult.hasOwnProperty(key) && key !== 'pairing') {
					reviewResult[key][createReviewDto[key]] += 1;
				} else if (reviewResult.hasOwnProperty(key) && key === 'pairing') {
					createReviewDto[key].forEach((value, index) => {
						reviewResult[key][value] += 1;
					});
				}
			}

			await this.drinkRepository
				.createQueryBuilder('drink')
				.update(Drink)
				.set({ review_result: reviewResult })
				.where('drink.id = :id', { id: drinkId })
				.execute();

			return result.id;
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
