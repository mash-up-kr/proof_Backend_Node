import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { SwaggerMethodDoc } from '@src/swagger/swagger-method-doc-type';
import { SubmitWorldcupRequestDto } from './dto/submit-worldcup-request.dto';
import { UserParticipatedWorldcupResultDto } from './dto/user-participated-worldcup-result-response.dto';
import { WorldcupByWithWhoResponseDto } from './dto/worldcup-by-with-who-response.dto';
import { WorldcupItemReseponseDto } from './dto/worldcup-item-response.dto';
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
	getWorldcupsByWithWho(summary: string) {
		return applyDecorators(
			ApiOperation({
				summary,
				description: '전체 월드컵 조회 - withWho별로 월드컵 데이터 묶어서 반환',
			}),
			ApiResponse({
				status: 200,
				description: '',
				type: WorldcupByWithWhoResponseDto,
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
				type: [WorldcupReseponseDto],
			}),
			ApiBearerAuth('Authorization'),
		);
	},
	getParticipatedWorldcup(summary: string) {
		return applyDecorators(
			ApiOperation({
				summary,
				description: '내가 참여한 월드컵',
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
				type: WorldcupItemReseponseDto,
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
