import { DrinksCategory } from '../../entities/drinks-category.entity';
import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';

export default class DrinksCategorySeed implements Seeder {
	public async run(Factory: Factory, connection: Connection): Promise<void> {
		await connection
			.createQueryBuilder()
			.insert()
			.into(DrinksCategory)
			.values([
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
			])
			.execute();
	}
}
