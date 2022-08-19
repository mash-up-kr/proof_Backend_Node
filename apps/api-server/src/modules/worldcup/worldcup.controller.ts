import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { AuthUser } from '@src/decorators/auth.decorator';
import { User } from '@src/entities/users.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
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

	@Get('/popular')
	@ApiDocs.getPopularWorldcup('현재 인기 있는 월드컵 조회')
	async getPopularWorldcup() {
		const worldcups = await this.worldcupService.getPopularWorldcup();
		return worldcups;
	}

	@Get('/user-participated')
	@UseGuards(JwtAuthGuard)
	@ApiDocs.getParticipatedWorldcup('내가 참여한 월드컵')
	async getParticipatedWorldcup(@AuthUser() user: User) {
		const worldcups = await this.worldcupService.getParticipatedWorldcup(user.id);
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
	@ApiCreatedResponse({ description: '월드컵 결과 제출 성공' })
	@ApiDocs.submitWoldcupResult('월드컵 결과 제출하기')
	async submitWoldcupResult(@AuthUser() user: User, @Param('id') id: number, @Body('drinkIds') drinkIds: number[]) {
		await this.worldcupService.submitWoldcupResult(id, drinkIds, user?.id);
	}
}
