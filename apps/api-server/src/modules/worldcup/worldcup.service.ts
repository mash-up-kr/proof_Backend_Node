import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WorldcupReseponseDto } from './dtos/worldcup-response.dto';
import { Worldcup } from './worldcup.entity';

@Injectable()
export class WolrdCupService {
	constructor(@InjectRepository(Worldcup) private readonly worldcupRepository: Repository<Worldcup>) {}

	async getWorldcups(): Promise<WorldcupReseponseDto[]> {
		const worldcups = await this.worldcupRepository.find();
		return worldcups.map((worldcup) => new WorldcupReseponseDto(worldcup));
	}

	async getWolrdcupById(id): Promise<WorldcupReseponseDto> {
		const worldcup = await this.worldcupRepository.findOneBy({ id });
		if (!worldcup) {
			throw new BadRequestException('존재하지 않는 월드컵입니다.');
		}

		return new WorldcupReseponseDto(worldcup);
	}
}
