import { Controller, Get, Param } from '@nestjs/common';
import { WolrdCupService } from './worldcup.service';

@Controller('worldcups')
export class WorldcupController {
	constructor(private readonly worldcupService: WolrdCupService) {}

	@Get()
	async getWorldcups() {
		const worldcups = await this.worldcupService.getWorldcups();
		return worldcups;
	}

	@Get('/:id')
	async getWolrdcupById(@Param('id') id: number) {
		const worldcup = await this.worldcupService.getWolrdcupById(id);
		return worldcup;
	}
}
