import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Drink } from '@src/entities/drinks.entity';
import { Companion, Mood, Time, Weather } from '@src/types/reviews.types';
import { DrinksEvaluationReseponseDto } from './dto/drinks-evaluation-response.dto';
import { DrinksEvaluationTasteDto } from './dto/drinks-evaluation-taste.dto';

@Injectable()
export class DrinksEvaluationService {
	constructor(
		@InjectRepository(Drink)
		private readonly drinkRepository: Repository<Drink>,
	) {}

	async findDrinkEvaluation(drinkId: number) {
		const reviewResultQuery = await this.drinkRepository
			.createQueryBuilder('drink')
			.select(`(drink.review_result)::JSONB AS review_result`)
			.where('drink.id = :id', { id: drinkId })
			.getRawOne();

		const reviewResult = reviewResultQuery.review_result;

		const result = new DrinksEvaluationReseponseDto();

		// max key 구하기
		result.weather = this.findMaxValuesKey(reviewResult.weather) as Weather;
		result.time = this.findMaxValuesKey(reviewResult.time) as Time;
		result.companion = this.findMaxValuesKey(reviewResult.companion) as Companion;
		result.mood = this.findMaxValuesKey(reviewResult.mood) as Mood;
		if (reviewResult.spot['1'] !== 0 || reviewResult.spot['2'] !== 0 || reviewResult.spot['3'] !== 0)
			result.spot = this.findMaxValuesKey(reviewResult.spot) as string;

		// 각 개수 구하기
		const isHeavyResult = this.quantifyDrinksExpression(reviewResult.is_heavy);
		result.is_heavy.Light = isHeavyResult.group1;
		result.is_heavy.Heavy = isHeavyResult.group2;
		const isBitterResult = this.quantifyDrinksExpression(reviewResult.is_bitter);
		result.is_bitter.Sweet = isBitterResult.group1;
		result.is_bitter.Bitter = isBitterResult.group2;
		const isStrongResult = this.quantifyDrinksExpression(reviewResult.is_strong);
		result.is_strong.Mild = isStrongResult.group1;
		result.is_strong.Strong = isStrongResult.group2;
		const isBurningResult = this.quantifyDrinksExpression(reviewResult.is_burning);
		result.is_burning.Smooth = isBurningResult.group1;
		result.is_burning.Burning = isBurningResult.group2;

		// taste 상위 세개 (전체 리뷰 개수 필요 - 합)
		const tasteResult = reviewResult.taste;
		result.taste = this.findTopTastes(tasteResult);

		// 안주 최고 3개 (max)
		const pairingResult = reviewResult.pairing;
		this.findTopPairings(pairingResult, result.pairing);
		return result;
	}

	private findMaxValuesKey(reviewResultObj: any): Weather | Time | Companion | Mood | string {
		const reviewResulttArr = Object.keys(reviewResultObj) as Weather[] | Time[] | Companion[] | Mood[] | string[];
		let maxKey: Weather | Time | Companion | Mood | string = reviewResulttArr[0];
		let maxVal: number = reviewResultObj[reviewResulttArr[0]];
		for (const key in reviewResultObj) {
			if (reviewResultObj[key] > maxVal) {
				maxKey = key as Weather | Time | Companion | Mood | string;
				maxVal = reviewResultObj[key];
			}
		}
		return maxKey;
	}

	// test
	private quantifyDrinksExpression(reviewResultObj: any) {
		let group1 = 0;
		let group2 = 0;
		for (const key in reviewResultObj) {
			if (Number(key) <= 3) group1 += reviewResultObj[key];
			else group2 += reviewResultObj[key];
		}
		return { group1, group2 };
	}

	private findTopTastes(reviewResultObj: any) {
		let reviewNum = 0;
		let tasteArr = [];
		for (const key in reviewResultObj) {
			reviewNum += reviewResultObj[key];
			if (reviewResultObj[key] > 0)
				tasteArr.push(
					new DrinksEvaluationTasteDto({
						taste_name: key,
						percent: reviewResultObj[key],
					}),
				);
		}
		tasteArr = tasteArr.sort((a, b) => a.percent - b.percent);
		const sliceIndex: number = tasteArr.length >= 3 ? 3 : tasteArr.length;
		tasteArr = tasteArr.slice(-sliceIndex);
		tasteArr.map((element) => {
			element.percent = String(Math.floor((element.percent / reviewNum) * 100)) + '%';
			return element;
		});
		return tasteArr;
	}

	private findTopPairings(reviewResultObj: any, pairingArr): any {
		let sortedPairingResult = [];
		for (const key in reviewResultObj) {
			if (reviewResultObj[key] > 0) sortedPairingResult.push([key, reviewResultObj[key]]);
		}

		sortedPairingResult.sort((a, b) => {
			return a[1] - b[1];
		});
		const sliceIndex: number = sortedPairingResult.length >= 3 ? 3 : sortedPairingResult.length;
		sortedPairingResult = sortedPairingResult.slice(-sliceIndex);
		for (const item of sortedPairingResult) {
			pairingArr.push(item[0]);
		}
	}
}
