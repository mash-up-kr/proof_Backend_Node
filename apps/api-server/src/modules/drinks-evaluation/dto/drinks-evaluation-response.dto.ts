import { ApiProperty } from '@nestjs/swagger';
import { Companion, Mood, Pairing, Spot, Time, Weather } from '@src/types/reviews.types';
import { DrinksEvaluationBitterDto } from './drinks-evaluation-bitter.dto';
import { DrinksEvaluationBurningDto } from './drinks-evaluation-burning.dto';
import { DrinksEvaluationStrongDto } from './drinks-evaluation-strong.dto';
import { DrinksEvaluationTasteDto } from './drinks-evaluation-taste.dto';
import { DrinksEvaluationHeavyDto } from './drinks-evalutaion-heavy.dto';

export class DrinksEvaluationReseponseDto {
	@ApiProperty({
		example: [Weather.Rainy, Time.Noon, Companion.Alone, Mood.Funny, '1'],
		description:
			'가장 많이 답한 이 술을 마셨을 때의 상황 (날씨, 시간, 함께 마신 사람, 분위기, spot(1,2,3차)) (spot이 없다면 array길이=4)',
	})
	situation: (Weather | Time | Companion | Mood | Spot)[];

	@ApiProperty({
		description: '가벼워요(Light)/무거워요(Heavy) 각각의 리뷰 개수',
	})
	is_heavy: DrinksEvaluationHeavyDto;

	@ApiProperty({
		description: '달아요(Sweet)/써요(Bitter) 각각의 리뷰 개수',
	})
	is_bitter: DrinksEvaluationBitterDto;

	@ApiProperty({
		description: '은은한 술맛(Mild)/찐한 술맛(Strong) 각각의 리뷰 개수',
	})
	is_strong: DrinksEvaluationStrongDto;

	@ApiProperty({
		description: '부드러운 목넘김(Smooth)/화끈거리는 목넘김(Burning) 각각의 리뷰 개수',
	})
	is_burning: DrinksEvaluationBurningDto;

	@ApiProperty({
		description: '가장 많이 답한 이 술의 느낌들과 각 비율 (최대 3가지)',
	})
	taste: DrinksEvaluationTasteDto[];

	@ApiProperty({
		enum: [Pairing],
		example: [Pairing.Grilled, Pairing.Fried],
		description: '가장 많이 답한 곁들인 안주의 종류 (최대 3가지) (리뷰가 없다면 빈 배열)',
	})
	pairing: Pairing[];

	constructor() {
		this.situation = [];
		this.is_heavy = new DrinksEvaluationHeavyDto();
		this.is_bitter = new DrinksEvaluationBitterDto();
		this.is_strong = new DrinksEvaluationStrongDto();
		this.is_burning = new DrinksEvaluationBurningDto();

		this.taste = [];
		this.pairing = [];
	}
}
