import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateUserProfileRequestDto {
	@IsNotEmpty()
	@IsNumber()
	@ApiProperty({ description: '수정할 프로필 id' })
	readonly id: number;
}
