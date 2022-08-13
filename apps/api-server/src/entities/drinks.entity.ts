import { ApiProperty } from '@nestjs/swagger';

import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { DrinksCategory } from './drinks-category.entity';
import { Review } from './reviews.entity';
import { CommonEntity } from './common.entity';
import { IsNotEmpty, IsNumber } from 'class-validator';

@Entity()
export class Drink extends CommonEntity {
	@ApiProperty({
		description: '술 이름 (한글)',
	})
	@Column({ type: 'varchar', nullable: false })
	name: string;

	@ApiProperty({
		description: '술 도수 (단위 %)',
	})
	@Column({ type: 'float', nullable: false })
	abv: number;

	@ApiProperty({
		example: '미국',
		description: '술 산지 (한글)',
	})
	@Column({ type: 'varchar' })
	origin: string;

	@ApiProperty({
		description: '술 설명',
	})
	@Column({ type: 'text', default: '준비 중입니다. 🍻' })
	description: string;

	@ApiProperty({
		description: '술 이미지 URL',
	})
	@Column({
		type: 'varchar',
		default: 'https://zuzu-resource.s3.ap-northeast-2.amazonaws.com/drinks-category/beer.png',
	}) // TODO: Change default img url to the real one after DES team give the real img.
	image_url: string;

	@ApiProperty({ example: 1 })
	@IsNumber()
	@IsNotEmpty()
	@Column()
	drink_category_id: number;

	@ApiProperty({
		type: () => DrinksCategory,
		description: 'Category of the drink such as beer, wine, etc.',
	})
	@ManyToOne(() => DrinksCategory, (category: DrinksCategory) => category.drinks, {
		onDelete: 'SET NULL',
	})
	@JoinColumn([
		{
			name: 'drink_category_id',
			referencedColumnName: 'id',
		},
	])
	category: DrinksCategory;

	@ApiProperty({
		type: () => [Review],
		description: 'The reviews of this drink',
	})
	@OneToMany(() => Review, (review: Review) => review.reviewed_drink, {
		cascade: true, // user를 통해 review가 추가, 수정, 삭제되고 사용자가 저장되면 추가된 review도 저장된다.
	})
	reviews: Review[];
}
