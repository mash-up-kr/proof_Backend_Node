import { IsString } from 'class-validator';
import { PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { GetUserProfileInfoDto } from '@src/modules/users-profile/dto/get-user-profile-info.dto';

export class GetUserInfoDto {
	@PrimaryGeneratedColumn()
	@ApiProperty({ description: '사용자 id' })
	readonly id: number;

	@IsString()
	@ApiProperty({ description: '사용자 이름' })
	readonly name: string;

	@IsString()
	@ApiProperty({ description: '사용자 닉네임 (초기에는 이름과 동일)' })
	readonly nickname: string;

	@IsString()
	@ApiProperty({ description: '사용자 이메일' })
	readonly email: string;

	@ApiProperty({ description: '새로운 프로필사진 정보' })
	readonly profile: GetUserProfileInfoDto;
}
