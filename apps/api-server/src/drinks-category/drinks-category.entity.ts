import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { CommonEntity } from '../common/entities/common.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { Category } from './drinks-category.types';
import { Drink } from '../drinks/drink.entity';

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
	@Column({ type: 'varchar', nullable: false })
	image_url: string;
	static Beer: any;

	@ApiProperty({
		type: () => [Drink],
		description: 'Specific Drinks in the category',
	})
	@OneToMany(() => Drink, (drink) => drink.category)
	drinks: Drink[];
}
