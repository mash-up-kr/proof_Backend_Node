import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { SwaggerMethodDoc } from '@src/swagger/swagger-method-doc-type';
import { number } from 'joi';
import { SubmitWorldcupRequestDto } from './dto/submit-worldcup-request.dto';
import { WorldcupReseponseDto } from './dto/worldcup-response.dto';
import { WorldcupController } from './worldcup.controller';

export const ApiDocs: SwaggerMethodDoc<WorldcupController> = {
	getWorldcups(summary: string) {
		return applyDecorators(
			ApiOperation({
				summary,
				description: '현재 지원하는 모든 월드컵 목록 조회',
			}),
			ApiResponse({
				status: 200,
				description: '',
				type: [WorldcupReseponseDto],
			}),
			ApiBearerAuth('Authorization'),
		);
	},
	getWorldcupById(summary: string) {
		return applyDecorators(
			ApiOperation({
				summary,
				description: '한 월드컵 정보 조회',
			}),
			ApiResponse({
				status: 200,
				description: '',
				type: WorldcupReseponseDto,
			}),
			ApiBearerAuth('Authorization'),
		);
	},
	getWorldcupItems(summary: string) {
		return applyDecorators(
			ApiOperation({
				summary,
				description: '월드컵의 선택지들 가져오기',
			}),
			ApiQuery({
				name: 'roundCount',
				type: 'number',
			}),
			ApiResponse({
				status: 200,
				description: '',
				type: WorldcupReseponseDto,
			}),
			ApiBearerAuth('Authorization'),
		);
	},
	submitWoldcupResult(summary: string) {
		return applyDecorators(
			ApiOperation({
				summary,
				description: '유저의 월드컵 결과 제출',
			}),
			ApiParam({
				name: 'id',
				required: true,
				description: '월드컵 id',
			}),
			ApiBody({
				type: SubmitWorldcupRequestDto,
			}),
			ApiBearerAuth('Authorization'),
		);
	},
};
