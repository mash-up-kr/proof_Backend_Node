import { ApiProperty } from '@nestjs/swagger';

export class DrinkDto {
	@ApiProperty({ description: '술 이름' })
	name: string;

	@ApiProperty({ description: '술 카테고리' })
	category: string;

	@ApiProperty({ description: '술 이미지' })
	imageUrl: string;

	@ApiProperty({ description: '술 도수' })
	abv: number;

	@ApiProperty({ description: '술 산지' })
	origin: string;

	constructor({ ...args }) {
		this.name = args.name;
		this.category = args.category;
		this.imageUrl = args.image_url;
		this.abv = args.abv;
		this.origin = args.origin;
	}
}
