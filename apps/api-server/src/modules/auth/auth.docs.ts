import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SwaggerMethodDoc } from '@src/swagger/swagger-method-doc-type';
import { AuthController } from './auth.controller';
import { TokenDto } from './dto/auth.token.dto';
import { KakaoLoginRequestDto } from './dto/kakao-login-request.dto';
import { TokenRefreshDto } from './dto/token-refresh.dto';

export const ApiDocs: SwaggerMethodDoc<AuthController> = {
	kakaoLogin(summary: string) {
		return applyDecorators(
			ApiOperation({
				summary,
				description:
					'카카오 서버 access token으로 사용자 정보를 가져와, 회원가입&로그인 후 사용자 정보와 토큰 반환',
			}),
			ApiBody({
				type: KakaoLoginRequestDto,
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
