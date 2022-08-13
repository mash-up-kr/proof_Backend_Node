import { ApiProperty } from '@nestjs/swagger';
import { UserProfilesResponseDto } from '@src/modules/users-profile/dto/user-profiles-response.dto';

export class AuthReseponseDto {
	@ApiProperty({ description: '사용자 id' })
	id: number;

	@ApiProperty({ description: '사용자 이름' })
	name: string;

	@ApiProperty({ description: '사용자 닉네임' })
	nickname: string;

	@ApiProperty({ description: '사용자 이메일' })
	email: string;

	@ApiProperty({ description: '사용자 프로필사진 정보' })
	profile: UserProfilesResponseDto;

	constructor({ id, name, nickname, email, profile }) {
		this.id = id;
		this.name = name;
		this.nickname = nickname;
		this.email = email;
		this.profile = new UserProfilesResponseDto(profile);
	}
}
