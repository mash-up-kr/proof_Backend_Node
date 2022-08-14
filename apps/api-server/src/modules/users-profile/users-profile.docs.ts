import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SwaggerMethodDoc } from '@src/swagger/swagger-method-doc-type';
import { UserProfilesResponseDto } from './dto/user-profiles-response.dto';
import { UsersProfileController } from './users-profile.controller';

export const ApiDocs: SwaggerMethodDoc<UsersProfileController> = {
	findAll(summary: string) {
		return applyDecorators(
			ApiOperation({
				summary,
				description: '모든 프로필 사진 반환',
			}),
			ApiResponse({
				status: 200,
				description: '',
				type: [UserProfilesResponseDto],
			}),
			ApiBearerAuth('Authorization'),
		);
	},
};
