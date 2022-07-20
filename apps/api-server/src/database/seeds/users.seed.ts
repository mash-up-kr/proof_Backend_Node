import { User } from '../../users/user.entity'; //'src/users/user.entity';
import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';

export class CreateInitialUserData implements Seeder {
	public async run(factory: Factory, connection: Connection): Promise<any> {
		await connection.createQueryBuilder().delete().from(User).execute();

		await connection
			.createQueryBuilder()
			.insert()
			.into(User)
			.values([{ email: 'testtest@email.com', name: 'test chung', password: '12345' }])
			.execute();
	}
}
