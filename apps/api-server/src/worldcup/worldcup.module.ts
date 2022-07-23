import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorldCupController } from './worldcup.controller';
import { WorldCup } from './worldcup.entity';
import { WolrdCupService } from './worldcup.service';

@Module({
	imports: [TypeOrmModule.forFeature([WorldCup])],
	controllers: [WorldCupController],
	providers: [WolrdCupService],
})
export class WorldCupModule {}
