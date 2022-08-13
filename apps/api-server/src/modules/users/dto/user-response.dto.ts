import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { PrimaryGeneratedColumn } from 'typeorm';

import { UserProfilesResponseDto } from '@src/modules/users-profile/dto/user-profiles-response.dto';
import { UserType } from '@src/types/users.types';

export class UserResponseDto {
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

	@IsString()
	@ApiProperty({ description: '사용자 타입 (카카오유저, 관리자)' })
	readonly type: UserType;

	@ApiProperty({ description: '새로운 프로필사진 정보' })
	readonly profile: UserProfilesResponseDto;

	constructor({ id, name, nickname, email, type, profile }) {
		this.id = id;
		this.name = name;
		this.nickname = nickname;
		this.email = email;
		this.type = type;
		this.profile = new UserProfilesResponseDto(profile);
	}
}
