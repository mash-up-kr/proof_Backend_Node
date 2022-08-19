import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthUser } from '@src/decorators/auth.decorator';
import { User } from '@src/entities/users.entity';
import { OptionalJwtAuthGuard } from '../auth/guards/optional-jwt-auth.guard';
import { ApiDocs } from './worldcup.docs';
import { WorldcupService } from './worldcup.service';

@Controller('worldcups')
@ApiTags('월드컵')
export class WorldcupController {
	constructor(private readonly worldcupService: WorldcupService) {}

	@Get()
	@ApiDocs.getWorldcups('전체 월드컵 조회')
	async getWorldcups() {
		const worldcups = await this.worldcupService.getWorldcups();
		return worldcups;
	}

	@Get('/:id')
	@ApiDocs.getWorldcupById('월드컵 하나의 정보 조회')
	async getWorldcupById(@Param('id') id: number) {
		const worldcup = await this.worldcupService.getWorldcupById(id);
		return worldcup;
	}

	@Get('/:id/item')
	@ApiDocs.getWorldcupItems('월드컵 선택지 가져오기')
	async getWorldcupItems(@Param('id') id: number, @Query('roundCount') roundCount: number) {
		const worldcupItem = await this.worldcupService.getWorldcupItemById(id, roundCount);
		return worldcupItem;
	}

	@Post('/:id')
	@UseGuards(OptionalJwtAuthGuard)
	@ApiDocs.submitWoldcupResult('월드컵 결과 제출하기')
	async submitWoldcupResult(@AuthUser() user: User, @Param('id') id: number, @Body('drinkIds') drinkIds: number[]) {
		const worldcupResult = await this.worldcupService.submitWoldcupResult(id, drinkIds, user?.id);
		return worldcupResult;
	}
}
