import { IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsString } from 'class-validator';

export class UserKakaoDto {
	@IsNotEmpty()
	@IsString()
	readonly name: string;
	@IsNotEmpty()
	@IsNumberString()
	readonly kakaoId: number;
	@IsNotEmpty()
	@IsOptional()
	@IsString()
	readonly email: string;
}
