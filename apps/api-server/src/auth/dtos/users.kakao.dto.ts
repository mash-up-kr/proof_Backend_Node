import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UserKakaoDto {
	@IsNotEmpty()
	@IsString()
	readonly name: string;

	@IsNotEmpty()
	@IsNumber()
	readonly kakaoId: number;

	@IsNotEmpty()
	@IsString()
	readonly email: string;
}
