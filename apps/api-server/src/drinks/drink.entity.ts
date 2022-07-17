import { CommonEntity } from '../common/entities/common.entity'; // '@src/common/entities/common.entity';
import { DrinksCategory } from '@src/drinks-category/drinks-category.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

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

	// TODO: One to Many relation with drinks category
	// REFERENCE: https://typeorm.io/many-to-one-one-to-many-relations
	// // Photo - User === Drink - DrinksCategory
	// @ManyToOne(() => DrinksCategory, (drinkCategory) => drinkCategory.drinks)
	@Column({ type: 'varchar', nullable: false })
	category: string;
}
