import { User } from '@src/entities/users.entity';

export class TokenDto {
	readonly accessToken: string;
	readonly refreshToken: string;
	readonly user: User;
}
