import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DrinksService } from './drinks.service';
import { DrinksController } from './drinks.controller';
import { Drink } from '@src/entities/drinks.entity';
import { WorldcupResultItem } from '@src/entities/worldcup-result-item.entity';

@Module({
	imports: [TypeOrmModule.forFeature([Drink, WorldcupResultItem])],
	providers: [DrinksService],
	controllers: [DrinksController],
	exports: [DrinksService],
})
export class DrinksModule {}
