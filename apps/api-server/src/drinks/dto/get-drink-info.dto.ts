import { IsEnum, IsNumber, IsString, IsUUID } from 'class-validator';

import { Category } from '@src/drinks-category/drinks-category.types';
import { DrinksCategory } from '@src/drinks-category/drinks-category.entity';

export class GetDrinkInfoDto {
	@IsUUID()
	readonly id: string;

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
