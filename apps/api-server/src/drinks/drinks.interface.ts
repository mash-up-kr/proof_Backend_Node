import { DrinksCategory } from '@src/drinks-category/drinks-category.entity';

export interface DrinkInfo {
	id: string;
	name: string;
	abv: number;
	origin: string;
	description: string;
	image_url: string;
	category: Pick<DrinksCategory, 'name'>;
}
