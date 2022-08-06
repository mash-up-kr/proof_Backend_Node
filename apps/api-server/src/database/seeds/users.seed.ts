import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';

import { User } from '../../entities/users.entity';

const seedUserData = {
	name: 'test martin',
	nickname: 'test nickname',
	email: 'testtest@email.com',
	social_id: 123456789,
	type: 'test',
	profile_emoji: 'test',
	refreshToken: 'test',
};

export class CreateInitialUserData implements Seeder {
	public async run(factory: Factory, connection: Connection): Promise<any> {
		const isTestUserExist = await connection
			.getRepository(User)
			.createQueryBuilder('user')
			.select()
			.where('user.email = :email', { email: seedUserData.email })
			.getOne();

		if (isTestUserExist) {
			await connection.getRepository(User).update({ email: seedUserData.email }, seedUserData);
		} else {
			await connection.getRepository(User).save(seedUserData);
		}
	}
}
