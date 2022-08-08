import { Factory, Seeder } from 'typeorm-seeding';

import { Connection } from 'typeorm';
import { Review } from '../../entities/reviews.entity';
import { Companion, Mood, Pairing, Taste, Time, Weather } from '@src/types/reviews.types';

export class CreateInitialReviewData implements Seeder {
	public async run(factory: Factory, connection: Connection): Promise<any> {
		await connection // TODO: update not to insert same data twice.
			.createQueryBuilder()
			.insert()
			.into(Review)
			.values([
				{
					weather: Weather.Rainy,
					time: Time.Noon,
					companion: Companion.Alone,
					mood: Mood.Funny,
					spot: 1,
					light: 1,
					sweet: 1,
					mild: 1,
					smooth: 1,
					taste: Taste.Fruity,
					place: '와인 한잔',
					pairing: [Pairing.Grilled, Pairing.Fried],
					reviewer_id: 1,
					reviewed_drink_id: 1,
				},
			])
			.execute();
	}
}
