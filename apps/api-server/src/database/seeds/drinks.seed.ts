import * as fastcsv from 'fast-csv';
import * as fs from 'fs';
import * as path from 'path';
import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';

import { DrinkData } from '@src/modules/drinks/drinks.types';
import { DrinksCategory } from '../../entities/drinks-category.entity';
import { Drink } from '../../entities/drinks.entity';

export default class DrinkSeed implements Seeder {
	public async run(Factory: Factory, connection: Connection): Promise<void> {
		const drink: DrinkData[] = await readCsv(path.resolve('apps/api-server/src/database/data', 'drinks.csv'));

		const currentDrinks = await connection.getRepository(Drink).createQueryBuilder().select().getMany();
		const drinksCategory = await connection.getRepository(DrinksCategory).createQueryBuilder().select().getMany();

		const category = drinksCategory.reduce((result, category) => {
			result[category.name] = category;
			return result;
		}, {});

		for (const data of drink) {
			const isDrinkExist = currentDrinks.find((drink) => drink.name === data.name);

			if (isDrinkExist) {
				await connection.getRepository(Drink).update(
					{ name: data.name },
					{
						name: data.name,
						abv: parseFloat(data.abv),
						origin: data.origin,
						description: data.description,
						imageUrl: data.image_url,
						category: category[data.category],
					},
				);
			} else {
				await connection.getRepository(Drink).save({
					name: data.name,
					abv: parseFloat(data.abv),
					origin: data.origin,
					description: data.description,
					imageUrl: data.image_url,
					category: category[data.category],
				});
			}
		}
	}
}

const readCsv = async (filePath: string): Promise<DrinkData[]> => {
	return new Promise((resolve, reject) => {
		const csvData: DrinkData[] = [];
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
