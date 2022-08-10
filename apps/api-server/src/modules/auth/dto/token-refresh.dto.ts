import { ApiProperty } from '@nestjs/swagger';

export class TokenRefreshDto {
	@ApiProperty({ description: '새로운 access token' })
	accessToken: string;
}
