import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import * as fs from 'fs';
import * as path from 'path';
import * as fastcsv from 'fast-csv';

import { Drink } from '../../drinks/drink.entity';
import { DrinksCategory } from '../../drinks-category/drinks-category.entity';

interface DrinkData {
	name: string;
	abv: string;
	origin: string;
	description: string;
	image_url: string;
	category: string;
}

export default class DrinkSeed implements Seeder {
	public async run(Factory: Factory, connection: Connection): Promise<void> {
		const drink: DrinkData[] = await readCsv(path.resolve('apps/api-server/src/database/data', 'drinks.csv'));

		const currentDrinks = await connection.getRepository(Drink).createQueryBuilder().select().getMany();

		for (const data of drink) {
			const isDrinkExist = currentDrinks.find((drink) => drink.name === data.name);
			const drinksCategory = await connection.getRepository(DrinksCategory).findOne({
				where: { name: data.category },
			});

			if (isDrinkExist) {
				await connection.getRepository(Drink).update(
					{ name: data.name },
					{
						name: data.name,
						abv: parseFloat(data.abv),
						origin: data.origin,
						description: data.description,
						image_url: data.image_url,
						category: drinksCategory,
					},
				);
			} else {
				await connection.getRepository(Drink).save({
					name: data.name,
					abv: parseFloat(data.abv),
					origin: data.origin,
					description: data.description,
					image_url: data.image_url,
					category: drinksCategory,
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
