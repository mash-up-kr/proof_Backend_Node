import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { SwaggerMethodDoc } from '@src/swagger/swagger-method-doc-type';
import { AuthController } from './auth.controller';
import { TokenDto } from './dto/auth.token.dto';
import { TokenRefreshDto } from './dto/token-refresh.dto';

export const ApiDocs: SwaggerMethodDoc<AuthController> = {
	getKakaoLoginPage(summary: string) {
		return applyDecorators(
			ApiOperation({
				summary,
				description: '카카오 로그인 페이지로 리디렉트',
			}),
			ApiResponse({
				status: 200,
				description: '',
			}),
		);
	},
	kakaoLoginCallback(summary: string) {
		return applyDecorators(
			ApiOperation({
				summary,
				description: '카카오 로그인 페이지에서 사용자가 로그인에 성공하면 사용자 정보와 토큰 반환',
			}),
			ApiResponse({
				status: 200,
				description: '',
				type: TokenDto,
			}),
		);
	},
	refreshToken(summary: string) {
		return applyDecorators(
			ApiOperation({
				summary,
				description: 'access token이 만료된 경우 재발급',
			}),
			ApiResponse({
				status: 201,
				description: '',
				type: TokenRefreshDto,
			}),
			ApiBearerAuth('Authorization'),
		);
	},
	logout(summary: string) {
		return applyDecorators(
			ApiOperation({
				summary,
				description: '로그아웃',
			}),
			ApiResponse({
				status: 201,
				description: '',
			}),
			ApiBearerAuth('Authorization'),
		);
	},
};
