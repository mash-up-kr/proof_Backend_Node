import { GetUserInfoDto } from '@src/modules/users/dto/get-user-info.dto';

export class TokenDto {
	readonly accessToken: string;
	readonly refreshToken: string;
	readonly user: GetUserInfoDto;
}
