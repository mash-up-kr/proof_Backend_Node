import { IsString, IsUUID } from 'class-validator';

export class GetUserProfileInfoDto {
	@IsUUID()
	readonly id: string;

	@IsString()
	readonly image_url: string;
}
