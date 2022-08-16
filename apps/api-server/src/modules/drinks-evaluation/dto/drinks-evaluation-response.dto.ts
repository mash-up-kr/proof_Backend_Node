import { ApiProperty } from '@nestjs/swagger';
import { Companion, Mood, Pairing, Time, Weather } from '@src/types/reviews.types';
import { DrinksEvaluationBitterDto } from './drinks-evaluation-bitter.dto';
import { DrinksEvaluationBurningDto } from './drinks-evaluation-burning.dto';
import { DrinksEvaluationStrongDto } from './drinks-evaluation-strong.dto';
import { DrinksEvaluationTasteDto } from './drinks-evaluation-taste.dto';
import { DrinksEvaluationHeavyDto } from './drinks-evalutaion-heavy.dto';

export class DrinksEvaluationReseponseDto {
	@ApiProperty({
		enum: Weather,
		example: Weather.Rainy,
		description: '가장 많이 답한 이 술을 마셨을 때의 날씨',
	})
	weather: Weather;

	@ApiProperty({
		enum: Time,
		example: Time.Noon,
		description: '가장 많이 답한 이 술을 마셨을 때의 시간',
	})
	time: Time;

	@ApiProperty({
		enum: Companion,
		example: Companion.Alone,
		description: '가장 많이 답한 이 술을 같이 마신 사람 유형',
	})
	companion: Companion;

	@ApiProperty({
		enum: Mood,
		example: Mood.Funny,
		description: '가장 많이 답한 이 술을 마셨을 때의 분위기',
	})
	mood: Mood;

	@ApiProperty({
		example: '1차',
		description: '가장 많이 답한 이 술을 마셨을 때의 spot (1차, 2차, 3차) (리뷰가 없다면 빈 스트링)',
	})
	spot: string;

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
		this.weather = Weather.Rainy;
		this.time = Time.Noon;
		this.companion = Companion.Alone;
		this.mood = Mood.Funny;
		this.spot = '';

		this.is_heavy = new DrinksEvaluationHeavyDto();
		this.is_bitter = new DrinksEvaluationBitterDto();
		this.is_strong = new DrinksEvaluationStrongDto();
		this.is_burning = new DrinksEvaluationBurningDto();

		this.taste = [];
		this.pairing = [];
	}
}
