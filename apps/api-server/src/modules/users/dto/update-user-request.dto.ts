import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

import { UpdateUserProfileRequestDto } from '../../users-profile/dto/update-user-profile-request.dto';

export class UpdateUserRequestDto {
	@IsOptional()
	@IsString()
	@ApiProperty({ description: '수정할 닉네임 (선택)' })
	readonly nickname: string;

	@IsOptional()
	@ApiProperty({ description: '수정할 프로필 (선택)' })
	readonly profile: UpdateUserProfileRequestDto;
}
