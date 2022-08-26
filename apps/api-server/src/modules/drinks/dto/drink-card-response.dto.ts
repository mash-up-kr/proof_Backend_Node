import { ApiProperty, OmitType } from '@nestjs/swagger';

import { DrinkDto } from './drink.dto';

export class DrinkCardResponseDto extends OmitType(DrinkDto, ['description'] as const) {
	@ApiProperty({
		description:
			'가장 많이 답한 이 술을 마셨을 때의 상황 (날씨, 시간, 함께 마신 사람, 분위기, spot(1,2,3차)) (spot이 없다면 array길이=4)',
	})
	tags?: string[];

	constructor({ ...args }) {
		super();
		this.id = args.id;
		this.name = args.name;
		this.imageUrl = args.imageUrl || args.image_url;
		this.abv = args.abv;
		this.origin = args.origin;
		this.category = args.category.name || args.category;

		this.tags = args.tags;
	}
}
