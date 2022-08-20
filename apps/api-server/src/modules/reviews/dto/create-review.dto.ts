import { ApiProperty, PickType } from '@nestjs/swagger';
import { Review } from '@src/entities/reviews.entity';
import { Pairing } from '@src/types/reviews.types';
import { IsOptional } from 'class-validator';

export class CreateReviewDto extends PickType(Review, [
	'weather',
	'time',
	'companion',
	'mood',
	'isHeavy',
	'isBitter',
	'isStrong',
	'isBurning',
	'taste',
]) {
	@IsOptional()
	@ApiProperty({
		example: 1,
		description: 'The answer of 혹시 몇 차였어요?',
	})
	spot?: 1 | 2 | 3;

	@IsOptional()
	@ApiProperty({
		example: '와인 한잔',
		description: 'The answer of 이 술을 먹었던 장소는',
	})
	place?: string;

	@IsOptional()
	@ApiProperty({
		enum: [Pairing],
		example: ['Grilled', 'Fried'],
		description: 'The answer of 곁들인 안주의 종류는 (여러개 가능)',
	})
	pairing?: Pairing[];
}
