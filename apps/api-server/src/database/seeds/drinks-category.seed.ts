import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';

import { DrinksCategory } from '../../entities/drinks-category.entity';

const categoriesData = [
	{
		name: 'All',
		imageUrl: 'https://zuzu-resource.s3.ap-northeast-2.amazonaws.com/drinks-category/category_all.png',
	},
	{
		name: 'Beer',
		imageUrl: 'https://zuzu-resource.s3.ap-northeast-2.amazonaws.com/drinks-category/category_beer.png',
	},
	{
		name: 'Whisky',
		imageUrl: 'https://zuzu-resource.s3.ap-northeast-2.amazonaws.com/drinks-category/category_whisky.png',
	},
	{
		name: 'Wine',
		imageUrl: 'https://zuzu-resource.s3.ap-northeast-2.amazonaws.com/drinks-category/category_wine.png',
	},
	{
		name: 'Cocktail',
		imageUrl: 'https://zuzu-resource.s3.ap-northeast-2.amazonaws.com/drinks-category/category_cocktail.png',
	},
	{
		name: 'Traditional',
		imageUrl: 'https://zuzu-resource.s3.ap-northeast-2.amazonaws.com/drinks-category/category_trad.png',
	},
	{
		name: 'Soju',
		imageUrl: 'https://zuzu-resource.s3.ap-northeast-2.amazonaws.com/drinks-category/category_soju.png',
	},
	{
		name: 'Etc',
		imageUrl: 'https://zuzu-resource.s3.ap-northeast-2.amazonaws.com/drinks-category/category_etc.png',
	},
];
export default class DrinksCategorySeed implements Seeder {
	public async run(Factory: Factory, connection: Connection): Promise<void> {
		const currentCategories = await connection
			.getRepository(DrinksCategory)
			.createQueryBuilder()
			.select()
			.getMany();

		for (const category of categoriesData) {
			const isCategoryExist = currentCategories.find((currentCategory) => currentCategory.name === category.name);

			if (isCategoryExist) {
				await connection.getRepository(DrinksCategory).update({ name: category.name }, category);
			} else {
				await connection.getRepository(DrinksCategory).save(category);
			}
		}
	}
}
