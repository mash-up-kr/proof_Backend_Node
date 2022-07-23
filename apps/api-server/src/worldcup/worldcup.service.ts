import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WorldcupReseponseDto } from './dtos/worldcup-response.dto';
import { Worldcup } from './worldcup.entity';

@Injectable()
export class WolrdCupService {
	constructor(@InjectRepository(Worldcup) private readonly worldcupRepository: Repository<Worldcup>) {}

	async getWorldcups(): Promise<WorldcupReseponseDto[]> {
		const worldcups = await this.worldcupRepository.find();
		return worldcups.map((worldcup) => WorldcupReseponseDto.from(worldcup));
	}

	async getWolrdcupById(id): Promise<WorldcupReseponseDto> {
		const worldcup = await this.worldcupRepository.findOneBy({ id });
		return WorldcupReseponseDto.from(worldcup);
	}
}
