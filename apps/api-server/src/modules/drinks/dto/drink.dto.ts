import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsString } from 'class-validator';
import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';

import { DrinksCategory } from '@src/entities/drinks-category.entity';
import { Category } from '@src/types/drinks-category.types';

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
	category: string;

	@ApiProperty({ description: '월드컵 우승 횟수' })
	@IsNumber()
	worldcupWinCount?: number;

	@ApiProperty({ description: '월드컵 4강 진출 횟수' })
	@IsNumber()
	worldcupSemiFinalCount?: number;

	constructor({ ...args }) {
		this.id = args.id;
		this.name = args.name;
		this.image_url = args.image_url;
		this.abv = args.abv;
		this.origin = args.origin;
		this.description = args.description;
		this.category = args.category.name;

		this.worldcupWinCount = args.worldcupWinCount;
		this.worldcupSemiFinalCount = args.worldcupSemiFinalCount;
	}
}
