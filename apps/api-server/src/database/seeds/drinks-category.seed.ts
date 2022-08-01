import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';

import { DrinksCategory } from '../../entities/drinks-category.entity';

const categoriesData = [
	{
		name: '맥주',
		image_url: 'https://zuzu-resource.s3.ap-northeast-2.amazonaws.com/drinks-category/beer.png',
	},
	{
		name: '위스키',
		image_url: 'https://zuzu-resource.s3.ap-northeast-2.amazonaws.com/drinks-category/beer.png',
	},
	{
		name: '와인',
		image_url: 'https://zuzu-resource.s3.ap-northeast-2.amazonaws.com/drinks-category/beer.png',
	},
	{
		name: '칵테일',
		image_url: 'https://zuzu-resource.s3.ap-northeast-2.amazonaws.com/drinks-category/beer.png',
	},
	{
		name: '전통주',
		image_url: 'https://zuzu-resource.s3.ap-northeast-2.amazonaws.com/drinks-category/beer.png',
	},
	{
		name: '소주',
		image_url: 'https://zuzu-resource.s3.ap-northeast-2.amazonaws.com/drinks-category/beer.png',
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
