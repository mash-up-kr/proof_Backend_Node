import { Injectable, PipeTransform } from '@nestjs/common';

import { DrinksService } from '@src/modules/drinks/drinks.service';
import { GetDrinkInfoDto } from '../dto/get-drink-info.dto';

@Injectable()
export class IdToDrinkPipe implements PipeTransform<string, Promise<GetDrinkInfoDto>> {
	private readonly drinksService: DrinksService;

	public constructor(drinksService: DrinksService) {
		this.drinksService = drinksService;
	}

	public async transform(id: string): Promise<GetDrinkInfoDto> {
		return await this.drinksService.findById(+id);
	}
}
