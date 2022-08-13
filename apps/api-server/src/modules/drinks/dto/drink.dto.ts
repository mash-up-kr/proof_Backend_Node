import { ApiProperty } from '@nestjs/swagger';
import { DrinksCategory } from '@src/entities/drinks-category.entity';
import { Category } from '@src/types/drinks-category.types';
import { Exclude } from 'class-transformer';
import { IsEnum, IsNumber, IsString } from 'class-validator';
import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';

export class DrinkDto {
	@ApiProperty({ description: '술 id' })
	@IsNumber()
	id: number;

	@ApiProperty({ description: 'Create Date' })
	@CreateDateColumn({
		type: 'timestamptz' /* timestamp with time zone. */,
	})
	createdAt: Date;

	@ApiProperty({ description: 'Update Date' })
	@UpdateDateColumn({ type: 'timestamptz' })
	updatedAt: Date;

	@ApiProperty({ description: 'Delete Date' })
	@DeleteDateColumn({ type: 'timestamptz' })
	deletedAt?: Date | null;

	@ApiProperty({ description: '술 이름' })
	@IsString()
	name: string;

	@ApiProperty({ description: '술 도수' })
	abv: number;

	@ApiProperty({ description: '술 산지' })
	@IsString()
	origin: string;

	@ApiProperty({ description: '술 설명' })
	@IsString()
	description: string;

	@ApiProperty({ description: '술 이미지' })
	@IsString()
	image_url: string;

	@ApiProperty({ description: '술 카테고리' })
	@IsEnum(Category)
	category: Pick<DrinksCategory, 'name'>;

	constructor({ ...args }) {
		this.id = args.id;
		this.createdAt = args.createdAt;
		this.updatedAt = args.updatedAt;
		this.deletedAt = args.deletedAt;
		this.name = args.name;
		this.image_url = args.image_url;
		this.abv = args.abv;
		this.origin = args.origin;
		this.description = args.description;
		this.category = args.category;
	}
}
