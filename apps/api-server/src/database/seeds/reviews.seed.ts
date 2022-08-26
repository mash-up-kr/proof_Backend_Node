import { Factory, Seeder } from 'typeorm-seeding';

import { Companion, Mood, Pairing, Taste, Time, Weather } from '@src/types/reviews.types';
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
					weather: Weather.Rainy,
					time: Time.Noon,
					companion: Companion.Alone,
					mood: Mood.Funny,
					spot: 2,
					isHeavy: 4,
					isBitter: 5,
					isStrong: 4,
					isBurning: 1,
					taste: Taste.Fruity,
					place: '와인 한잔',
					pairing: [Pairing.Grilled, Pairing.Fried],
					reviewerId: 1,
					reviewedDrinkId: 1,
				},
			])
			.execute();
	}
}
