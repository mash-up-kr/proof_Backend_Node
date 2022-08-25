import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DrinksService } from './drinks.service';
import { DrinksController } from './drinks.controller';
import { Drink } from '@src/entities/drinks.entity';
import { WorldcupResultItem } from '@src/entities/worldcup-result-item.entity';
import { DrinksEvaluationModule } from '@src/modules/drinks-evaluation/drinks-evaluation.module';

@Module({
	imports: [DrinksEvaluationModule, TypeOrmModule.forFeature([Drink, WorldcupResultItem])],
	providers: [DrinksService],
	controllers: [DrinksController],
	exports: [DrinksService],
})
export class DrinksModule {}
