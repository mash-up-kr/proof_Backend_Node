import { Factory, Seeder } from 'typeorm-seeding';

import { Connection } from 'typeorm';
import { Review } from '../../entities/reviews.entity';

export class CreateInitialReviewData implements Seeder {
	public async run(factory: Factory, connection: Connection): Promise<any> {
		await connection
			.createQueryBuilder()
			.insert()
			.into(Review)
			.values([
				{
					weather: 'Rainy',
					time: 'Evening',
					companion: 'Alone',
					mood: 'Funny',
					spot: 1,
					light: 1,
					sweet: 1,
					mild: 1,
					smooth: 1,
					taste: 'Fruity',
					place: 'test place',
					pairing: ['Grilled', 'Fried']
					
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
