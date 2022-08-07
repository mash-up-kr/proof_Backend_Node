import { IsEnum, IsNumber, IsString } from 'class-validator';

import { Category } from '@src/types/drinks-category.types';
import { DrinksCategory } from '@src/entities/drinks-category.entity';

export class GetDrinkInfoDto {
	@IsNumber()
	readonly id: number;

	@IsString()
	readonly name: string;

	@IsNumber()
	readonly abv: number;

	@IsString()
	readonly origin: string;

	@IsString()
	readonly description: string;

	@IsString()
	readonly image_url: string;

	@IsEnum(Category)
	readonly category: Pick<DrinksCategory, 'name'>;
}
