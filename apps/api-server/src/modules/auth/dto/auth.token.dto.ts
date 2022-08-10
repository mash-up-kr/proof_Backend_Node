import { ApiProperty } from '@nestjs/swagger';

import { GetUserInfoDto } from '@src/modules/users/dto/get-user-info.dto';

export class TokenDto {
	@ApiProperty({ description: 'access token' })
	readonly accessToken: string;

	@ApiProperty({ description: 'refresh token' })
	readonly refreshToken: string;

	@ApiProperty({ description: '사용자 정보' })
	readonly user: GetUserInfoDto;
}
