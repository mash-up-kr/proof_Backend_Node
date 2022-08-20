import { ApiProperty } from '@nestjs/swagger';

export class DrinkCategoryDto {
	@ApiProperty({ description: '카테고리 ID' })
	id: number;

	@ApiProperty({ description: '카테고리 이름' })
	name: string;

	@ApiProperty({ description: '카테고리 사진' })
	imageUrl: string;

	constructor({ id, name, imageUrl }) {
		this.id = id;
		this.name = name;
		this.imageUrl = imageUrl;
	}
}
