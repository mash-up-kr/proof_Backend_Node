import { Controller, Get, Param, BadRequestException, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AuthUser } from '@src/decorators/auth.decorator';
import { Category } from '@src/types/drinks-category.types';
import { JwtAuthGuard } from '@src/modules/auth/guards/jwt-auth.guard';
import { ApiDocs } from './drinks.docs';
import { DrinksService } from './drinks.service';
import { User } from '@src/entities/users.entity';

@ApiTags('drinks - 술 상세 정보')
@Controller('drinks')
export class DrinksController {
	constructor(private readonly drinksService: DrinksService) {}

	@Get()
	@ApiDocs.findAllDrinks('전체 술 상세 정보 조회')
	public async findAllDrinks() {
		return await this.drinksService.findAllDrinks();
	}

	@Get('/category')
	@ApiDocs.findDrinksByCategory('카테고리별 술 상세 정보 조회')
	public async findDrinksByCategory(
		@Query('name') name: Category,
		@Query('offset') offset: number,
		@Query('length') length: number,
	) {
		if (!name) {
			throw new BadRequestException();
		}
		return await this.drinksService.findDrinksByCategory(name, offset, length);
	}

	@Get(':id')
	@ApiDocs.findDrinkById('특정 술 상세 정보 조회')
	public async findDrinkById(@Param('id') id: number) {
		return await this.drinksService.findDrinkById(id);
	}

	@Get('/reviews/users/:id')
	@UseGuards(JwtAuthGuard)
	@ApiDocs.findUserReviewedDrinks('나의 술 저장고 - 리뷰한 술 목록')
	public async findUserReviewedDrinks(@AuthUser() user: User) {
		return await this.drinksService.findReviewedDrinksbyUser(user.id);
	}
}
