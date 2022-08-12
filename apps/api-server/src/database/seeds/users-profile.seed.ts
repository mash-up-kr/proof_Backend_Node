import { Factory, Seeder } from 'typeorm-seeding';

import { Connection } from 'typeorm';
import { UsersProfile } from '../../entities/users-profile.entity';

const usersProfileData = [
	{
		image_url: 'https://zuzu-resource.s3.ap-northeast-2.amazonaws.com/drinks-category/category_beer.png',
	},
	{
		image_url: 'https://zuzu-resource.s3.ap-northeast-2.amazonaws.com/drinks-category/category_whisky.png',
	},
	{
		image_url: 'https://zuzu-resource.s3.ap-northeast-2.amazonaws.com/drinks-category/category_wine.png',
	},
	{
		image_url: 'https://zuzu-resource.s3.ap-northeast-2.amazonaws.com/drinks-category/category_cocktail.png',
	},
	{
		image_url: 'https://zuzu-resource.s3.ap-northeast-2.amazonaws.com/drinks-category/category_trad.png',
	},
	{
		image_url: 'https://zuzu-resource.s3.ap-northeast-2.amazonaws.com/drinks-category/category_soju.png',
	},
	{
		image_url: 'https://zuzu-resource.s3.ap-northeast-2.amazonaws.com/drinks-category/category_etc.png',
	},
];
export default class UsersProfileSeed implements Seeder {
	public async run(Factory: Factory, connection: Connection): Promise<void> {
		const currentUserProfiles = await connection
			.getRepository(UsersProfile)
			.createQueryBuilder()
			.select()
			.getMany();

		for (const profile of usersProfileData) {
			const isProfileExist = currentUserProfiles.find(
				(currentUserProfile) => currentUserProfile.image_url === profile.image_url,
			);

			if (isProfileExist) {
				await connection.getRepository(UsersProfile).update({ image_url: profile.image_url }, profile);
			} else {
				await connection.getRepository(UsersProfile).save(profile);
			}
		}
	}
}
