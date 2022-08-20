import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { PrimaryGeneratedColumn } from 'typeorm';

export class UserProfilesResponseDto {
	@PrimaryGeneratedColumn()
	@ApiProperty({ description: '프로필사진 id' })
	readonly id: number;

	@IsString()
	@ApiProperty({ description: '프로필사진 url' })
	readonly imageUrl: string;

	constructor({ id, imageUrl }) {
		this.id = id;
		this.imageUrl = imageUrl;
	}
}
