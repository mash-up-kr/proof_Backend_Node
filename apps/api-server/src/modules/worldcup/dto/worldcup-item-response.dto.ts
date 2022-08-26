import { ApiProperty } from '@nestjs/swagger';

export class WorldcupItemReseponseDto {
	@ApiProperty({ description: '월드컵 id' })
	id: number;

	@ApiProperty({ description: '술 이름' })
	name: string;

	@ApiProperty({ description: '술 도수' })
	abv: number;

	@ApiProperty({ description: '술 카테고리' })
	category: string;

	@ApiProperty({ description: '술 이미지' })
	imageUrl: string;

	constructor({ id, name, abv, imageUrl, category }) {
		this.id = id;
		this.name = name;
		this.abv = abv;
		this.imageUrl = imageUrl;
		this.category = category.name;
	}
}
