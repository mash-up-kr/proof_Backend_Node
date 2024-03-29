import { ApiProperty } from '@nestjs/swagger';
import { Companion, Mood, Pairing, Taste, Time, Weather } from '@src/types/reviews.types';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { CommonEntity } from './common.entity';
import { Drink } from './drinks.entity';
import { User } from './users.entity';

@Entity()
export class Review extends CommonEntity {
	@ApiProperty({
		enum: Weather,
		example: Weather.Rainy,
		description: 'The answer of 이 술을 마셨던 날의 날씨는...',
	})
	@IsString()
	@IsNotEmpty()
	@Column({ type: 'enum', enum: Weather, nullable: false })
	weather: Weather;

	@ApiProperty({
		enum: Time,
		example: Time.Noon,
		description: 'The answer of 이 술을 마셨던 시간은...',
	})
	@IsString()
	@IsNotEmpty()
	@Column({ type: 'enum', enum: Time, nullable: false })
	time: Time;

	@ApiProperty({
		enum: Companion,
		example: Companion.Alone,
		description: 'The answer of 누구와 마셨나요?',
	})
	@IsString()
	@IsNotEmpty()
	@Column({ type: 'enum', enum: Companion, nullable: false })
	companion: Companion;

	@ApiProperty({
		enum: Mood,
		example: Mood.Funny,
		description: 'The answer of 어떤 분위기로 마셨나요?',
	})
	@IsString()
	@IsNotEmpty()
	@Column({ type: 'enum', enum: Mood, nullable: false })
	mood: Mood;

	@ApiProperty({
		example: 1,
		description: 'The answer of 혹시 몇 차였어요?',
	})
	@IsNumber()
	@Column({ type: 'int', nullable: true })
	spot: 1 | 2 | 3;

	@ApiProperty({
		example: 1,
		description: 'The answer of 가벼워요(Light)/무거워요(Heavy)',
	})
	@IsNumber()
	@IsNotEmpty()
	@Column({ name: 'is_heavy', type: 'int', nullable: false })
	isHeavy: 1 | 2 | 3 | 4 | 5 | 6;

	@ApiProperty({
		example: 1,
		description: 'The answer of 달아요(Sweet)/써요(Bitter)',
	})
	@IsNumber()
	@IsNotEmpty()
	@Column({ name: 'is_bitter', type: 'int', nullable: false })
	isBitter: 1 | 2 | 3 | 4 | 5 | 6;

	@ApiProperty({
		example: 1,
		description: 'The answer of 은은한 술맛(Mild)/찐한 술맛(Strong)',
	})
	@IsNumber()
	@IsNotEmpty()
	@Column({ name: 'is_strong', type: 'int', nullable: false })
	isStrong: 1 | 2 | 3 | 4 | 5 | 6;

	@ApiProperty({
		example: 1,
		description: 'The answer of 부드러운 목넘김(Smooth)/화끈거리는 목넘김(Burning)',
	})
	@IsNumber()
	@IsNotEmpty()
	@Column({ name: 'is_burning', type: 'int', nullable: false })
	isBurning: 1 | 2 | 3 | 4 | 5 | 6;

	@ApiProperty({
		enum: Taste,
		example: Taste.Fruity,
		description: 'The answer of 이 술은 어떤 느낌이었나요?',
	})
	@IsString()
	@IsNotEmpty()
	@Column({ type: 'enum', enum: Taste, nullable: false })
	taste: Taste;

	@ApiProperty({
		example: '와인 한잔',
		description: 'The answer of 이 술을 먹었던 장소는',
	})
	@IsString()
	@Column({ type: 'text', nullable: true })
	place: string;

	@ApiProperty({
		enum: [Pairing],
		example: ['Grilled', 'Fried'],
		description: 'The answer of 곁들인 안주의 종류는 (여러개 가능)',
	})
	@Column({ type: 'varchar', array: true, nullable: true })
	pairing: Pairing[];

	@ApiProperty({ example: 1 })
	@IsNumber()
	@IsNotEmpty()
	@Column({ name: 'reviewer_id' })
	reviewerId: number;

	@ApiProperty({
		type: () => User,
		description: 'The user who wrote this review',
	})
	@ManyToOne(() => User, (reviewer: User) => reviewer.reviews, {
		onDelete: 'SET NULL', // if user(reviewer) is deleted, reviewer_id is set to null
	})
	@JoinColumn([
		{
			name: 'reviewer_id',
			referencedColumnName: 'id',
		},
	])
	reviewer: User;

	@ApiProperty({ example: 1 })
	@IsNumber()
	@IsNotEmpty()
	@Column({ name: 'reviewed_drink_id' })
	reviewedDrinkId: number;

	@ApiProperty({
		type: () => Drink,
		description: 'The drink this review is about',
	})
	@ManyToOne(() => Drink, (reviewedDrink: Drink) => reviewedDrink.reviews, {
		onDelete: 'SET NULL', // if drink(reviewed_drink) is deleted, reviewed_drink_id is set to null
	})
	@JoinColumn([
		{
			name: 'reviewed_drink_id',
			referencedColumnName: 'id',
		},
	])
	reviewedDrink: Drink;
}
