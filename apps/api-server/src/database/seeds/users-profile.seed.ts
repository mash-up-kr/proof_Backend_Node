import { Factory, Seeder } from 'typeorm-seeding';

import { Connection } from 'typeorm';
import { UsersProfile } from '../../entities/users-profile.entity';

const usersProfileData = [
	{
		imageUrl: 'https://zuzu-resource.s3.ap-northeast-2.amazonaws.com/drinks-category/category_beer.png',
	},
	{
		imageUrl: 'https://zuzu-resource.s3.ap-northeast-2.amazonaws.com/drinks-category/category_whisky.png',
	},
	{
		imageUrl: 'https://zuzu-resource.s3.ap-northeast-2.amazonaws.com/drinks-category/category_wine.png',
	},
	{
		imageUrl: 'https://zuzu-resource.s3.ap-northeast-2.amazonaws.com/drinks-category/category_cocktail.png',
	},
	{
		imageUrl: 'https://zuzu-resource.s3.ap-northeast-2.amazonaws.com/drinks-category/category_trad.png',
	},
	{
		imageUrl: 'https://zuzu-resource.s3.ap-northeast-2.amazonaws.com/drinks-category/category_soju.png',
	},
	{
		imageUrl: 'https://zuzu-resource.s3.ap-northeast-2.amazonaws.com/drinks-category/category_etc.png',
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
				(currentUserProfile) => currentUserProfile.imageUrl === profile.imageUrl,
			);

			if (isProfileExist) {
				await connection.getRepository(UsersProfile).update({ imageUrl: profile.imageUrl }, profile);
			} else {
				await connection.getRepository(UsersProfile).save(profile);
			}
		}
	}
}
