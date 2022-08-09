import { IsString } from 'class-validator';
import { PrimaryGeneratedColumn } from 'typeorm';

export class GetUserProfileInfoDto {
	@PrimaryGeneratedColumn()
	readonly id: number;

	@IsString()
	readonly image_url: string;
}
