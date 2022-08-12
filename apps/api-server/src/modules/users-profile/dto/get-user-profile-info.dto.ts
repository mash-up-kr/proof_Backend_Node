import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { PrimaryGeneratedColumn } from 'typeorm';

export class GetUserProfileInfoDto {
	@PrimaryGeneratedColumn()
	@ApiProperty({ description: '프로필사진 id' })
	readonly id: number;

	@IsString()
	@ApiProperty({ description: '프로필사진 url' })
	readonly image_url: string;

	constructor({ id, image_url }) {
		this.id = id;
		this.image_url = image_url;
	}
}
