import { Controller, Get, Inject } from '@nestjs/common';
import { WolrdCupService } from './worldcup.service';

@Controller('worldcups')
export class WorldcupController {
	constructor(private readonly worldcupService: WolrdCupService) {}

	@Get()
	async getWorldcups() {
		const worldcups = await this.worldcupService.getWorldcups();
		return worldcups;
	}
}
