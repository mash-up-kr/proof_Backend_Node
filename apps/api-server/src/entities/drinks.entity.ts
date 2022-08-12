import { ApiProperty } from '@nestjs/swagger';

import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

import { DrinksCategory } from './drinks-category.entity';
import { Review } from './reviews.entity';
import { CommonEntity } from './common.entity';

@Entity()
export class Drink extends CommonEntity {
	@Column({ type: 'varchar', nullable: false })
	name: string;

	@Column({ type: 'float', nullable: false })
	abv: number;

	@Column({ type: 'varchar' })
	origin: string;

	@Column({ type: 'text', default: '준비 중입니다. 🍻' })
	description: string;

	@Column({
		type: 'varchar',
		default: 'https://zuzu-resource.s3.ap-northeast-2.amazonaws.com/drinks-category/beer.png',
	}) // TODO: Change default img url to the real one after DES team give the real img.
	image_url: string;

	@ApiProperty({
		type: () => DrinksCategory,
		description: 'Category of the drink such as beer, wine, etc.',
	})
	@ManyToOne(() => DrinksCategory, (drinkCategory) => drinkCategory.drinks, {
		onDelete: 'SET NULL',
	})
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
