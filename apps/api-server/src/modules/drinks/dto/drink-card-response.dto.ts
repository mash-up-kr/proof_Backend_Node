import { OmitType } from '@nestjs/swagger';

import { DrinkDto } from './drink.dto';

export class DrinkCardResponseDto extends OmitType(DrinkDto, ['id', 'description'] as const) {
	constructor({ ...args }) {
		super();
		this.name = args.name;
		this.image_url = args.image_url;
		this.abv = args.abv;
		this.origin = args.origin;
		this.category = args.category.name;
	}
}
