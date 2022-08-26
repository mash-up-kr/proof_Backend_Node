import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Drink } from '@src/entities/drinks.entity';
import { Companion, Mood, ReviewResultItem, Spot, Time, Weather } from '@src/types/reviews.types';
import { DrinksEvaluationReseponseDto } from './dto/drinks-evaluation-response.dto';
import { DrinksEvaluationTasteDto } from './dto/drinks-evaluation-taste.dto';
import { DrinkReviewResultDto } from '../drinks/dto/drink-review-result.dto';

@Injectable()
export class DrinksEvaluationService {
	constructor(
		@InjectRepository(Drink)
		private readonly drinkRepository: Repository<Drink>,
	) {}

	async findDrinkEvaluation(drinkId: number) {
		try {
			const drink = await this.drinkRepository
				.createQueryBuilder('drink')
				.where('drink.id = :id', { id: drinkId })
				.getOne();

			if (!drink) throw new BadRequestException('존재하지 않는 술입니다.');
			if (!drink.reviewResult.hasReview) return { result: null };

			const result = new DrinksEvaluationReseponseDto();
			const reviewResult = drink.reviewResult;

			// max key 구하기
			result.situation = this.findMainSituations(reviewResult);

			// 각 개수 구하기
			result.isHeavy = reviewResult.isHeavy;
			result.isBitter = reviewResult.isBitter;
			result.isStrong = reviewResult.isStrong;
			result.isBurning = reviewResult.isBurning;

			// taste 상위 세개 (전체 리뷰 개수 필요 - 합)
			const tasteResult = reviewResult.taste;
			result.taste = this.findTopTastes(tasteResult);

			// 안주 최고 3개 (max)
			const pairingResult = reviewResult.pairing;
			this.findTopPairings(pairingResult, result.pairing);
			return { result };
		} catch (error) {
			throw new InternalServerErrorException(error.message, error);
		}
	}

	private findMaxValuesKey(reviewResultObject: any): ReviewResultItem {
		const reviewResultKeys = Object.keys(reviewResultObject) as ReviewResultItem[];
		let maxKey: ReviewResultItem = reviewResultKeys[0];
		let maxVal: number = reviewResultObject[reviewResultKeys[0]];
		for (const key in reviewResultObject) {
			if (reviewResultObject[key] > maxVal) {
				maxKey = key as ReviewResultItem;
				maxVal = reviewResultObject[key];
			}
		}
		return maxKey;
	}

	private findTopTastes(reviewResultObject: any) {
		let reviewNum = 0;
		let tastes = [];

		Object.entries(reviewResultObject).forEach(([tasteName, percent]) => {
			reviewNum += percent as number;
			if (percent > 0)
				tastes.push(
					new DrinksEvaluationTasteDto({
						tasteName,
						percent,
					}),
				);
		});

		tastes = tastes.sort((a, b) => b.percent - a.percent);
		tastes = tastes.slice(0, 3);
		tastes.map((element) => {
			element.percent = Math.floor((element.percent / reviewNum) * 100);
			return element;
		});
		return tastes;
	}

	private findTopPairings(reviewResultObject: any, pairings: any): any {
		let sortedPairingResult = Object.entries(reviewResultObject).filter(([pairingName, value]) => value > 0);

		sortedPairingResult.sort((a, b) => {
			return (b[1] as number) - (a[1] as number);
		});
		sortedPairingResult = sortedPairingResult.slice(0, 3);
		for (const item of sortedPairingResult) {
			pairings.push(item[0]);
		}
	}

	findMainSituations(reviewResult: DrinkReviewResultDto): (Weather | Time | Companion | Mood | Spot)[] {
		const result = [];

		if (!reviewResult.hasReview) {
			return result;
		}

		const weather = this.findMaxValuesKey(reviewResult.weather) as Weather;
		const time = this.findMaxValuesKey(reviewResult.time) as Time;
		const companion = this.findMaxValuesKey(reviewResult.companion) as Companion;
		const mood = this.findMaxValuesKey(reviewResult.mood) as Mood;

		result.push(weather, time, companion, mood);

		if (reviewResult.spot['1'] !== 0 || reviewResult.spot['2'] !== 0 || reviewResult.spot['3'] !== 0) {
			const spot = this.findMaxValuesKey(reviewResult.spot) as Spot;
			result.push(spot);
		}
		return result;
	}
}
