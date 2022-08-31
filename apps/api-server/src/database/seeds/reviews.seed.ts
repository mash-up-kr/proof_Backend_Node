import * as fastcsv from 'fast-csv';
import * as fs from 'fs';
import * as path from 'path';
import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';

import { Review } from '../../entities/reviews.entity';
import { Drink } from '@src/entities/drinks.entity';
import { CreateReviewResultDto } from '@src/modules/reviews/dto/create-review-result.dto';

export class CreateInitialReviewData implements Seeder {
	public async run(factory: Factory, connection: Connection): Promise<any> {
		const reviews = await readCsv(path.resolve('apps/api-server/src/database/data', 'reviews.csv'));

		for (const data of reviews) {
			const createReviewDto = {
				weather: data.weather,
				time: data.time,
				companion: data.companion,
				mood: data.mood,
				spot: data.spot,
				isHeavy: data.isHeavy,
				isBitter: data.isBitter,
				isStrong: data.isStrong,
				isBurning: data.isBurning,
				taste: data.taste,
				pairing: [data.pairing],
				reviewerId: data.reviewerId,
				reviewedDrinkId: data.reviewedDrinkId,
			};
			await connection.getRepository(Review).save(createReviewDto);

			const drink = await connection
				.getRepository(Drink)
				.createQueryBuilder()
				.select('drink')
				.from(Drink, 'drink')
				.where('drink.id = :id', { id: data.reviewedDrinkId })
				.getOne();

			const reviewResult = drink.reviewResult;
			if (!reviewResult.hasReview) reviewResult.hasReview = true;

			const reviewResultDto = new CreateReviewResultDto(createReviewDto);
			for (const key in reviewResultDto) {
				if (key !== 'pairing') {
					reviewResult[key][reviewResultDto[key]] += 1;
				} else {
					reviewResultDto[key].forEach((value) => {
						reviewResult[key][value] += 1;
					});
				}
			}

			await connection
				.getRepository(Drink)
				.createQueryBuilder()
				.update(Drink)
				.set({ reviewResult: reviewResult })
				.where('drink.id = :id', { id: data.reviewedDrinkId })
				.execute();
		}
	}
}

const readCsv = async (filePath: string): Promise<any> => {
	return new Promise((resolve, reject) => {
		const csvData = [];
		const csvStream = fs.createReadStream(filePath);
		const csvParser = fastcsv.parse({ headers: true });

		csvStream
			.pipe(csvParser)
			.on('error', (err) => {
				throw new Error(`Error occurred while reading csv file ${err}`);
			})
			.on('data', (row) => {
				csvData.push(row);
			})
			.on('end', () => {
				resolve(csvData);
			});
	});
};
