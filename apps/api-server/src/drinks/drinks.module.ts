import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DrinksService } from './drinks.service';
import { DrinksController } from './drinks.controller';
import { Drink } from './drink.entity';

@Module({
	imports: [TypeOrmModule.forFeature([Drink])],
	providers: [DrinksService],
	controllers: [DrinksController],
})
export class DrinksModule {}
