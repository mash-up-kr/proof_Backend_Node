import { ApiProperty } from '@nestjs/swagger';
import { DrinkCategoryDto } from '@src/modules/drinks-category/dto/drink-category.dto';

export class WorldcupItemReseponseDto {
	@ApiProperty({ description: '월드컵 id' })
	id: number;

	@ApiProperty({ description: '술 이름' })
	name: string;

	@ApiProperty({ description: '술 도수' })
	abv: number;

	@ApiProperty({ description: '술 카테고리' })
	category: DrinkCategoryDto;

	@ApiProperty({ description: '술 카테고리' })
	imageUrl: string;

	constructor({ id, name, abv, imageUrl, category }) {
		this.id = id;
		this.name = name;
		this.abv = abv;
		this.imageUrl = imageUrl;
		this.category = new DrinkCategoryDto(category);
	}
}
