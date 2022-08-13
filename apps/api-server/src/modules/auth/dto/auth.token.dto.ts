import { ApiProperty } from '@nestjs/swagger';

import { UserResponseDto } from '@src/modules/users/dto/user-response.dto';

export class TokenDto {
	@ApiProperty({ description: 'access token' })
	readonly accessToken: string;

	@ApiProperty({ description: 'refresh token' })
	readonly refreshToken: string;

	@ApiProperty({ description: '사용자 정보' })
	readonly user: UserResponseDto;
}
