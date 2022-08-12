import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersProfile } from '@src/entities/users-profile.entity';
import { UsersProfileController } from './users-profile.controller';
import { UsersProfileService } from './users-profile.service';

@Module({
	imports: [TypeOrmModule.forFeature([UsersProfile])],
	controllers: [UsersProfileController],
	providers: [UsersProfileService],
})
export class UsersProfileModule {}
