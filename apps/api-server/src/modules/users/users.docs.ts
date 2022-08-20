import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SwaggerMethodDoc } from '@src/swagger/swagger-method-doc-type';
import { UserResponseDto } from './dto/user-response.dto';
import { UsersController } from './users.controller';

export const ApiDocs: SwaggerMethodDoc<UsersController> = {
	getUser(summary: string) {
		return applyDecorators(
			ApiOperation({
				summary,
				description: '사용자 정보 반환',
			}),
			ApiResponse({
				status: 200,
				description: '',
				type: UserResponseDto,
			}),
			ApiBearerAuth('Authorization'),
		);
	},
	updateUser(summary: string) {
		return applyDecorators(
			ApiOperation({
				summary,
				description: '사용자 정보 수정 (닉네임, 프로필사진)',
			}),
			ApiResponse({
				status: 201,
				description: '',
			}),
			ApiBearerAuth('Authorization'),
		);
	},
	deleteUser(summary: string) {
		return applyDecorators(
			ApiOperation({
				summary,
				description: '회원탈퇴 (사용자 삭제)',
			}),
			ApiResponse({
				status: 201,
				description: '',
			}),
			ApiBearerAuth('Authorization'),
		);
	},
};
