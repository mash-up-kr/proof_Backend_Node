import { User } from '@src/auth/entities/users.entity';

export interface TokenSchema {
	accessToken: string;
	refreshToken: string;
	user: User;
}
