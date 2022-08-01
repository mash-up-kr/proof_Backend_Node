import { ApiProperty } from '@nestjs/swagger';

import { Column, Entity, ManyToOne } from 'typeorm';

import { CommonEntity } from './common.entity';
import { DrinksCategory } from './drinks-category.entity';

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
	@ManyToOne(() => DrinksCategory, (drinkCategory) => drinkCategory.drinks)
	category: DrinksCategory;
}
