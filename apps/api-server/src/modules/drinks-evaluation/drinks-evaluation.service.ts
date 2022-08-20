import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Drink } from '@src/entities/drinks.entity';
import { Companion, Mood, ReviewResultItem, Spot, Time, Weather } from '@src/types/reviews.types';
import { DrinksEvaluationReseponseDto } from './dto/drinks-evaluation-response.dto';
import { DrinksEvaluationTasteDto } from './dto/drinks-evaluation-taste.dto';

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
				.select(`(drink.review_result)::JSONB AS review_result`)
				.where('drink.id = :id', { id: drinkId })
				.getRawOne();

			if (!drink) throw new BadRequestException('존재하지 않는 술입니다.');
			if (!drink.review_result.has_review) return { result: null };

			const result = new DrinksEvaluationReseponseDto();
			const reviewResult = drink.review_result;

			// max key 구하기
			const weather = this.findMaxValuesKey(reviewResult.weather) as Weather;
			const time = this.findMaxValuesKey(reviewResult.time) as Time;
			const companion = this.findMaxValuesKey(reviewResult.companion) as Companion;
			const mood = this.findMaxValuesKey(reviewResult.mood) as Mood;
			result.situation.push(weather, time, companion, mood);
			if (reviewResult.spot['1'] !== 0 || reviewResult.spot['2'] !== 0 || reviewResult.spot['3'] !== 0) {
				const spot = this.findMaxValuesKey(reviewResult.spot) as Spot;
				result.situation.push(spot);
			}

			// 각 개수 구하기
			result.is_heavy = reviewResult.is_heavy;
			result.is_bitter = reviewResult.is_bitter;
			result.is_strong = reviewResult.is_strong;
			result.is_burning = reviewResult.is_burning;

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

		Object.entries(reviewResultObject).forEach(([taste_name, percent]) => {
			reviewNum += percent as number;
			if (percent > 0)
				tastes.push(
					new DrinksEvaluationTasteDto({
						taste_name,
						percent,
					}),
				);
		});

		tastes = tastes.sort((a, b) => b.percent - a.percent);
		tastes = tastes.slice(0, 3);
		tastes.map((element) => {
			element.percent = String(Math.floor((element.percent / reviewNum) * 100)) + '%';
			return element;
		});
		return tastes;
	}

	private findTopPairings(reviewResultObject: any, pairings: any): any {
		let sortedPairingResult = Object.entries(reviewResultObject).filter(([pairing_name, value]) => value > 0);

		sortedPairingResult.sort((a, b) => {
			return (b[1] as number) - (a[1] as number);
		});
		sortedPairingResult = sortedPairingResult.slice(0, 3);
		for (const item of sortedPairingResult) {
			pairings.push(item[0]);
		}
	}
}
