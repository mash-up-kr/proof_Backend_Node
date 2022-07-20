import { Factory, Seeder } from 'typeorm-seeding';

import { Connection } from 'typeorm';
import { User } from '@src/auth/entities/users.entity';

export class CreateInitialUserData implements Seeder {
	public async run(factory: Factory, connection: Connection): Promise<any> {
		await connection
			.createQueryBuilder()
			.insert()
			.into(User)
			.values([{ email: 'testtest@email.com', name: 'test chung' }])
			.execute();
	}
}
