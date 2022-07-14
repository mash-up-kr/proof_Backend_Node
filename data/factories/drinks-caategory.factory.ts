import { define } from 'typeorm-seeding';
import Faker from 'faker';

import { DrinksCategory } from '../../src/drinks-category/drinks-category.entity';

define(DrinksCategory, (faker: typeof Faker) => {
	console.log('user.factory.ts...');
	const drinksCategory = new DrinksCategory();
	drinksCategory.name = faker.name.firstName();
	drinksCategory.image_url = faker.internet.email();

	return drinksCategory;
});

// const categoryName = ['맥주', '위스키', '와인', '칵테일', '전통주', '소주'];
// const categoryImageUrl = [
// 	'https://zuzu-resource.s3.ap-northeast-2.amazonaws.com/drinks-category/beer.png',
// 	'https://zuzu-resource.s3.ap-northeast-2.amazonaws.com/drinks-category/beer.png',
// 	'https://zuzu-resource.s3.ap-northeast-2.amazonaws.com/drinks-category/beer.png',
// 	'https://zuzu-resource.s3.ap-northeast-2.amazonaws.com/drinks-category/beer.png',
// 	'https://zuzu-resource.s3.ap-northeast-2.amazonaws.com/drinks-category/beer.png',
// 	'https://zuzu-resource.s3.ap-northeast-2.amazonaws.com/drinks-category/beer.png',
// ];

// let index = 0;

// define(DrinksCategory, (faker: typeof Faker) => {
// 	console.log('!!!!!!!!!!!!!!!');
// 	const drinksCategory = new DrinksCategory();
// 	console.log(categoryName[index], categoryImageUrl[index]);
// 	drinksCategory.name = categoryName[index];
// 	drinksCategory.image_url = categoryImageUrl[index];

// 	index += 1;

// 	return drinksCategory;
// });
