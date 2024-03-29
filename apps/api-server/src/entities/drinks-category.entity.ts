import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty, IsString } from 'class-validator';
import { Column, Entity, OneToMany } from 'typeorm';

import { Category } from '../types/drinks-category.types';
import { CommonEntity } from './common.entity';
import { Drink } from './drinks.entity';

@Entity()
export class DrinksCategory extends CommonEntity {
	@ApiProperty({
		enum: Category,
		example: Category.Beer,
		description: 'Drinks category',
	})
	@IsString()
	@IsNotEmpty()
	@Column({ type: 'enum', enum: Category, unique: true, nullable: false })
	name: string;

	@ApiProperty({
		example: 'https://zuzu-resource.s3.ap-northeast-2.amazonaws.com/drinks-category/beer.png',
		description: 'URL of the drinks category emoji image',
	})
	@IsString()
	@IsNotEmpty()
	@Column({ name: 'image_url', type: 'varchar', nullable: false })
	imageUrl: string;
	static Beer: any;

	@ApiProperty({
		type: () => [Drink],
		description: 'Specific Drinks in the category',
	})
	@OneToMany(() => Drink, (drink: Drink) => drink.category, {
		cascade: true,
	})
	drinks: Drink[];
}
