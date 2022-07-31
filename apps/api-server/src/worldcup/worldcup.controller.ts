import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ApiDocs } from './worldcup.docs';
import { WolrdCupService } from './worldcup.service';

@Controller('worldcups')
@ApiTags('월드컵')
export class WorldcupController {
	constructor(private readonly worldcupService: WolrdCupService) {}

	@Get()
	@ApiDocs.getWorldcups('전체 월드컵 조회')
	async getWorldcups() {
		const worldcups = await this.worldcupService.getWorldcups();
		return worldcups;
	}

	@Get('/:id')
	@ApiDocs.getWolrdcupById('월드컵 하나의 정보 조회')
	async getWolrdcupById(@Param('id') id: number) {
		const worldcup = await this.worldcupService.getWolrdcupById(id);
		return worldcup;
	}
}
