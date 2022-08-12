import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { Review } from '@src/entities/reviews.entity';
import { User } from '@src/entities/users.entity';
import { Drink } from '@src/entities/drinks.entity';

@Module({
	imports: [TypeOrmModule.forFeature([Review, User, Drink])],
	controllers: [ReviewsController],
	providers: [ReviewsService],
})
export class ReviewsModule {}
