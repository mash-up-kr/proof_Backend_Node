import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Drink } from '@src/entities/drinks.entity';
import { WorldcupResult } from '@src/entities/worldcup-result.entity';
import { Worldcup } from '@src/entities/worldcup.entity';
import { DrinksModule } from '../drinks/drinks.module';
import { DrinksService } from '../drinks/drinks.service';
import { WorldcupController } from './worldcup.controller';
import { WorldcupService } from './worldcup.service';

@Module({
	imports: [DrinksModule, TypeOrmModule.forFeature([Worldcup, WorldcupResult, Drink])],
	controllers: [WorldcupController],
	providers: [WorldcupService],
})
export class WorldcupModule {}
