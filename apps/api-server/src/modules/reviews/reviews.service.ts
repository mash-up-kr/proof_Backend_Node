import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { Review } from '@src/entities/reviews.entity';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewCardResponseDto } from './dto/review-card-response.dto';
import { ReviewItemResponseDto } from './dto/review-item-response.dto';
import { DrinksService } from '@src/modules/drinks/drinks.service';
import { DrinkCardResponseDto } from '@src/modules/drinks/dto/drink-card-response.dto';

@Injectable()
export class ReviewsService {
	constructor(
		private readonly drinksService: DrinksService,
		@InjectRepository(Review)
		private readonly reviewRepository: Repository<Review>,
	) {}

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
	): Promise<{ totalPageCount: number; drink: DrinkCardResponseDto; reviewList: ReviewItemResponseDto[] }> {
		try {
			const drink = await this.drinksService.findDrinkById(drinkId);

			const queryBuilder = this.reviewRepository
				.createQueryBuilder('review')
				.select()
				.leftJoin('review.reviewed_drink', 'drink')
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
				drink: new DrinkCardResponseDto(drink),
				reviewList: reviewsOfDrink.map((review) => new ReviewItemResponseDto(review)),
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
