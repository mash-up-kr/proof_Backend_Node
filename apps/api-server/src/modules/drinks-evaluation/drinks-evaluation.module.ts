import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Drink } from '@src/entities/drinks.entity';
import { DrinksEvaluationController } from './drinks-evaluation.controller';
import { DrinksEvaluationService } from './drinks-evaluation.service';

@Module({
	imports: [TypeOrmModule.forFeature([Drink])],
	controllers: [DrinksEvaluationController],
	providers: [DrinksEvaluationService],
	exports: [DrinksEvaluationService],
})
export class DrinksEvaluationModule {}
