import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { SwaggerMethodDoc } from '@src/swagger/swagger-method-doc-type';
import { GetUserProfileInfoDto } from './dto/get-user-profile-info.dto';
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
				type: [GetUserProfileInfoDto],
			}),
			ApiBearerAuth('Authorization'),
		);
	},
};
