import { Factory, Seeder } from 'typeorm-seeding';

import { Connection } from 'typeorm';
import { User } from '../../entities/users.entity';

export class CreateInitialUserData implements Seeder {
	public async run(factory: Factory, connection: Connection): Promise<any> {
		await connection
			.createQueryBuilder()
			.insert()
			.into(User)
			.values([
				{
					name: 'test user',
					nickname: 'test nickname',
					email: 'testtest@email.com',
					social_id: 1,
					type: 'test type',
					reviews: [], // TODO: Add reviews id
				},
			])
			.execute();
	}
}
