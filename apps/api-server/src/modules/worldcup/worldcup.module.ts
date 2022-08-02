import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Drink } from '@src/entities/drinks.entity';
import { WorldcupController } from './worldcup.controller';
import { Worldcup } from './worldcup.entity';
import { WolrdCupService } from './worldcup.service';

@Module({
	imports: [TypeOrmModule.forFeature([Worldcup, Drink])],
	controllers: [WorldcupController],
	providers: [WolrdCupService],
})
export class WorldcupModule {}
