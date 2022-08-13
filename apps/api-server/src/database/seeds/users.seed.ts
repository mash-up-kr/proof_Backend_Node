import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';

import { DEFAULT_USER_PROFILE } from '@src/modules/users-profile/users-profile.constants';
import { UsersProfile } from '../../entities/users-profile.entity';
import { User } from '../../entities/users.entity';

const seedUserData = {
	name: 'test martin',
	nickname: 'test nickname',
	email: 'testtest@email.com',
	social_id: 123456789,
	type: 'test',
	profile_emoji: 'test',
};

export class CreateInitialUserData implements Seeder {
	public async run(factory: Factory, connection: Connection): Promise<any> {
		const defaultUserProfile = DEFAULT_USER_PROFILE;

		const usersProfile = await connection
			.getRepository(UsersProfile)
			.createQueryBuilder()
			.select('users_profile')
			.from(UsersProfile, 'users_profile')
			.where('users_profile.image_url = :image_url', { image_url: defaultUserProfile })
			.getOne();

		const currentUser = await connection
			.getRepository(User)
			.createQueryBuilder()
			.select('user')
			.from(User, 'user')
			.where('user.social_id = :social_id', { social_id: seedUserData.social_id })
			.getOne();

		if (!currentUser) await connection.getRepository(User).save({ ...seedUserData, profile: usersProfile });
	}
}
