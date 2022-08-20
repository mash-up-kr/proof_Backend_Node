import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { SwaggerMethodDoc } from '@src/swagger/swagger-method-doc-type';
import { number } from 'joi';
import { SubmitWorldcupRequestDto } from './dto/submit-worldcup-request.dto';
import { UserParticipatedWorldcupResultDto } from './dto/user-participated-worldcup-result-response.dto';
import { WorldcupReseponseDto } from './dto/worldcup-response.dto';
import { WorldcupWithParticipantCountReseponseDto } from './dto/worldcup-with-participant-count-response.dto';
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
	getPopularWorldcup(summary: string) {
		return applyDecorators(
			ApiOperation({
				summary,
				description: '인기있는 월드컵 조회',
			}),
			ApiResponse({
				status: 200,
				description: '',
				type: [WorldcupWithParticipantCountReseponseDto],
			}),
			ApiBearerAuth('Authorization'),
		);
	},
	getParticipatedWorldcup(summary: string) {
		return applyDecorators(
			ApiOperation({
				summary,
				description: '현재는 한 월드컵당 하나의 결과만 옴. 같은 월드컵 여러개 대응하게 수정해야함',
			}),
			ApiResponse({
				status: 200,
				description: '',
				type: [UserParticipatedWorldcupResultDto],
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
				description: '유저의 월드컵 결과 제출. 로그인 없이도 가능',
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
