import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DrinksCategory } from './drinks-category.entity';
import { DrinksCategoryService } from './drinks-category.service';
import { DrinksCategoryController } from './drinks-category.controller';

@Module({
	imports: [TypeOrmModule.forFeature([DrinksCategory])],
	providers: [DrinksCategoryService],
	controllers: [DrinksCategoryController],
})
export class DrinksCategoryModule {}
