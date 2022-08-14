import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';

import { UsersProfile } from '@src/entities/users-profile.entity';
import { DEFAULT_USER_PROFILE } from '@src/modules/users-profile/users-profile.constants';
import { UserType } from '@src/types/users.types';
import { User } from '../../entities/users.entity';

const seedUserData = {
	name: 'zuzu',
	kakaoId: 2386981290, //TODO: 클라이언트에서 카카오로그인 구현이 완성되면, 그때의 kakaoId로 수정 예정
	email: 'zuzuu6271@gmail.com',
};

export class CreateInitialUserData implements Seeder {
	public async run(factory: Factory, connection: Connection): Promise<any> {
		const currentUser = await connection
			.getRepository(User)
			.createQueryBuilder()
			.select('user')
			.from(User, 'user')
			.where('user.email = :email', { email: seedUserData.email })
			.getOne();

		if (!currentUser) {
			const defaultUserProfile = DEFAULT_USER_PROFILE;
			const usersProfile = await connection
				.getRepository(UsersProfile)
				.createQueryBuilder()
				.select('users_profile')
				.from(UsersProfile, 'users_profile')
				.where('users_profile.image_url = :image_url', { image_url: defaultUserProfile })
				.getOne();

			await connection.getRepository(User).save({
				name: seedUserData.name,
				nickname: seedUserData.name,
				email: seedUserData.email,
				social_id: seedUserData.kakaoId,
				type: UserType.Admin,
				profile: usersProfile,
			});
		}
	}
}
