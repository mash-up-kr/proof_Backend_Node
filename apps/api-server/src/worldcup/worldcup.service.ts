import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Worldcup } from './worldcup.entity';

@Injectable()
export class WolrdCupService {
	constructor(@InjectRepository(Worldcup) private readonly worldcupRepository: Repository<Worldcup>) {}

	async getWorldcups(): Promise<Worldcup[]> {
		const worldcups = await this.worldcupRepository.find();
		return worldcups;
	}

	async getWolrdcupById(id): Promise<Worldcup> {
		console.log('id : ', id);
		const worldcup = await this.worldcupRepository.findOneBy({ id });
		console.log(worldcup);
		return worldcup;
	}
}
