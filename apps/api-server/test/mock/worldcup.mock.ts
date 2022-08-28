import { BadRequestException } from '@nestjs/common';

import { omit } from 'lodash';

import { Category } from '@src/types/drinks-category.types';
import { MockService } from '../common/mock.type';
import { WorldcupService } from '@src/modules/worldcup/worldcup.service';

export const mockWorldcups = [
	{
		id: 1,
		title: '또르르 비오는 날 혼자 마시고 싶은 술은?',
		imageUrl:
			'https://zuzu-resource.s3.ap-northeast-2.amazonaws.com/worlcup/thumbnail/worldcup_thumbnail_solo_rain.png',
		withWho: {
			code: 'SOLO',
			content: '혼자서 먹어요',
			title: '혼술은 진리지',
		},
		situation: {
			code: 'RAIN',
			content: '창밖에 빗물 흐르는',
			title: '주륵주륵',
		},
		round: [
			{
				count: 8,
				title: '가볍게',
			},
			{
				count: 16,
				title: '무난하게',
			},
			{
				count: 32,
				title: '섬세하게',
			},
		],
	},
	{
		id: 2,
		title: '깊게 취하고 싶은 날 혼자 마시고 싶은 술은?',
		imageUrl:
			'https://zuzu-resource.s3.ap-northeast-2.amazonaws.com/worlcup/thumbnail/worldcup_thumbnail_solo_high.png',
		withWho: {
			code: 'SOLO',
			content: '혼자서 먹어요',
			title: '혼술은 진리지',
		},
		situation: {
			code: 'HIGH',
			content: '깊게 취하고 싶은',
			title: '도수가 낮은 도수가 높은 술',
		},
		round: [
			{
				count: 8,
				title: '가볍게',
			},
			{
				count: 16,
				title: '무난하게',
			},
			{
				count: 32,
				title: '섬세하게',
			},
		],
	},
];

export class MockWorldcupRepository {
	save = jest.fn().mockResolvedValue(mockWorldcups[0]);

	async find() {
		return mockWorldcups;
	}
}

export const mockWorldcupService: MockService<WorldcupService> = {
	getWorldcups: jest.fn(() => {}),
	getWorldcupsByWithWho: jest.fn(() => {}),
	getPopularWorldcup: jest.fn(() => {}),
	getWorldcupById: jest.fn(() => {}),
	getWorldcupItemById: jest.fn(() => {}),
	submitWoldcupResult: jest.fn(() => {}),
	getParticipatedWorldcup: jest.fn(() => {}),
};
