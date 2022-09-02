import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';

import { Worldcup } from '@src/entities/worldcup.entity';

export default class WorldcupSeed implements Seeder {
	public async run(Factory: Factory, connection: Connection): Promise<void> {
		const insertValues = [
			{
				title: '또르르 비오는 날 혼자 마시고 싶은 술은?',
				imageUrl:
					'https://zuzu-resource.s3.ap-northeast-2.amazonaws.com/worlcup/thumbnail/worldcup_thumbnail_solo_rain.png',
				withWhoCode: 'SOLO',
				withWhoTitle: '혼술은 진리지',
				withWhoContent: '혼자서 먹어요',
				situationCode: 'RAIN',
				situationTitle: '주륵주륵',
				situationContent: '창밖에 빗물 흐르는',
				round: [
					{
						title: '가볍게',
						count: 8,
					},
					{
						title: '무난하게',
						count: 16,
					},
					{
						title: '섬세하게',
						count: 32,
					},
				],
			},
			{
				title: '깊게 취하고 싶은 날 혼자 마시고 싶은 술은?',
				imageUrl:
					'https://zuzu-resource.s3.ap-northeast-2.amazonaws.com/worlcup/thumbnail/worldcup_thumbnail_solo_high.png',
				withWhoCode: 'SOLO',
				withWhoTitle: '혼술은 진리지',
				withWhoContent: '혼자서 먹어요',
				situationCode: 'HIGH',
				situationTitle: '도수가 낮은 도수가 높은 술',
				situationContent: '깊게 취하고 싶은',
				round: [
					{
						title: '가볍게',
						count: 8,
					},
					{
						title: '무난하게',
						count: 16,
					},
					{
						title: '섬세하게',
						count: 32,
					},
				],
			},
			{
				title: '우울 터지는 날 혼자 마시고 싶은 술은?',
				imageUrl:
					'https://zuzu-resource.s3.ap-northeast-2.amazonaws.com/worlcup/thumbnail/worldcup_thumbnail_solo_gloomy.png',
				withWhoCode: 'SOLO',
				withWhoTitle: '혼술은 진리지',
				withWhoContent: '혼자서 먹어요',
				situationCode: 'GLOOMY',
				situationTitle: '도수가 높은 우울우울',
				situationContent: '센치하고 꿀꿀한',
				round: [
					{
						title: '가볍게',
						count: 8,
					},
					{
						title: '무난하게',
						count: 16,
					},
					{
						title: '섬세하게',
						count: 32,
					},
				],
			},
			{
				title: '대낮부터 땡겨서 혼자 마시고 싶은 술은?',
				imageUrl:
					'https://zuzu-resource.s3.ap-northeast-2.amazonaws.com/worlcup/thumbnail/worldcup_thumbnail_solo_afternoon.png',
				withWhoCode: 'SOLO',
				withWhoTitle: '혼술은 진리지',
				withWhoContent: '혼자서 먹어요',
				situationCode: 'AFTERNOON',
				situationTitle: '도수가 중간인 밝은 대낮',
				situationContent: '점심에 홀짝 마시는',
				round: [
					{
						title: '가볍게',
						count: 8,
					},
					{
						title: '무난하게',
						count: 16,
					},
					{
						title: '섬세하게',
						count: 32,
					},
				],
			},
			{
				title: '해가 쨍쨍 맑은 날 혼자 마시고 싶은 술은?',
				imageUrl:
					'https://zuzu-resource.s3.ap-northeast-2.amazonaws.com/worlcup/thumbnail/worldcup_thumbnail_solo_sun.png',
				withWhoCode: 'SOLO',
				withWhoTitle: '혼술은 진리지',
				withWhoContent: '혼자서 먹어요',
				situationCode: 'SUN',
				situationTitle: '해가 쨍쨍',
				situationContent: '맑은 날 호로록 마시는',
				round: [
					{
						title: '가볍게',
						count: 8,
					},
					{
						title: '무난하게',
						count: 16,
					},
					{
						title: '섬세하게',
						count: 32,
					},
				],
			},
			{
				title: '가볍게 혼자 한 모금 마시고 싶은 술은?',
				imageUrl:
					'https://zuzu-resource.s3.ap-northeast-2.amazonaws.com/worlcup/thumbnail/worldcup_thumbnail_solo_low.png',
				withWhoCode: 'SOLO',
				withWhoTitle: '혼술은 진리지',
				withWhoContent: '혼자서 먹어요',
				situationCode: 'LOW',
				situationTitle: '텐션 도수가 낮은 술',
				situationContent: '가볍게 한 모금 즐기는',
				round: [
					{
						title: '가볍게',
						count: 8,
					},
					{
						title: '무난하게',
						count: 16,
					},
					{
						title: '섬세하게',
						count: 32,
					},
				],
			},
			{
				title: '혼자 텐션 업 되고 싶을 때 마시고 싶은 술은?',
				imageUrl:
					'https://zuzu-resource.s3.ap-northeast-2.amazonaws.com/worlcup/thumbnail/worldcup_thumbnail_solo_tension.png',
				withWhoCode: 'SOLO',
				withWhoTitle: '혼술은 진리지',
				withWhoContent: '혼자서 먹어요',
				situationCode: 'TENSION',
				situationTitle: '밝은 텐션 업',
				situationContent: '가보자고! 신나버리는',
				round: [
					{
						title: '가볍게',
						count: 8,
					},
					{
						title: '무난하게',
						count: 16,
					},
					{
						title: '섬세하게',
						count: 32,
					},
				],
			},
			{
				title: '하루를 마무리하는 저녁에 혼자 마시고 싶은 술은?',
				imageUrl:
					'https://zuzu-resource.s3.ap-northeast-2.amazonaws.com/worlcup/thumbnail/worldcup_thumbnail_solo_night.png',
				withWhoCode: 'SOLO',
				withWhoTitle: '혼술은 진리지',
				withWhoContent: '혼자서 먹어요',
				situationCode: 'NIGHT',
				situationTitle: '어둑한 저녁',
				situationContent: '하루를 마무리하는',
				round: [
					{
						title: '가볍게',
						count: 8,
					},
					{
						title: '무난하게',
						count: 16,
					},
					{
						title: '섬세하게',
						count: 32,
					},
				],
			},
			{
				title: '연인과 로맨틱한 분위기에서 마시고 싶은 술은?',
				imageUrl:
					'https://zuzu-resource.s3.ap-northeast-2.amazonaws.com/worlcup/thumbnail/worldcup_thumbnail_duo_couple.png',
				withWhoCode: 'DUO',
				withWhoTitle: '옹기종기 모여',
				withWhoContent: '여럿이서 먹어요',
				situationCode: 'COUPLE',
				situationTitle: '연인과 함께',
				situationContent: '로맨틱하게 즐기는창밖에 빗물 흐르는',
				round: [
					{
						title: '가볍게',
						count: 8,
					},
					{
						title: '무난하게',
						count: 16,
					},
					{
						title: '섬세하게',
						count: 32,
					},
				],
			},
			{
				title: '다 같이 한껏 취하고 싶은 날 마시고 싶은 술은?',
				imageUrl:
					'https://zuzu-resource.s3.ap-northeast-2.amazonaws.com/worlcup/thumbnail/worldcup_thumbnail_duo_high.png',
				withWhoCode: 'DUO',
				withWhoTitle: '옹기종기 모여',
				withWhoContent: '여럿이서 먹어요',
				situationCode: 'HIGH',
				situationTitle: '도수가 낮은 도수가 높은 술',
				situationContent: '다 같이 취하는가볍게 한 모금 즐기는',
				round: [
					{
						title: '가볍게',
						count: 8,
					},
					{
						title: '무난하게',
						count: 16,
					},
					{
						title: '섬세하게',
						count: 32,
					},
				],
			},
			{
				title: '힘들어하는 친구를 위로할 때 함께 마시고 싶은 술은?',
				imageUrl:
					'https://zuzu-resource.s3.ap-northeast-2.amazonaws.com/worlcup/thumbnail/worldcup_thumbnail_duo_gloomy.png',
				withWhoCode: 'DUO',
				withWhoTitle: '옹기종기 모여',
				withWhoContent: '여럿이서 먹어요',
				situationCode: 'GLOOMY',
				situationTitle: '도수가 높은 우울우울',
				situationContent: '힘든 친구를 위로하는깊게 취하고 싶은',
				round: [
					{
						title: '가볍게',
						count: 8,
					},
					{
						title: '무난하게',
						count: 16,
					},
					{
						title: '섬세하게',
						count: 32,
					},
				],
			},
			{
				title: '대낮부터 함께 한 잔 때리고 싶은 술은?',
				imageUrl:
					'https://zuzu-resource.s3.ap-northeast-2.amazonaws.com/worlcup/thumbnail/worldcup_thumbnail_duo_afternoon.png',
				withWhoCode: 'DUO',
				withWhoTitle: '옹기종기 모여',
				withWhoContent: '여럿이서 먹어요',
				situationCode: 'AFTERNOON',
				situationTitle: '도수가 중간인 밝은 대낮',
				situationContent: '점심에 함께 한 잔 하는중간으로 취하고 싶은',
				round: [
					{
						title: '가볍게',
						count: 8,
					},
					{
						title: '무난하게',
						count: 16,
					},
					{
						title: '섬세하게',
						count: 32,
					},
				],
			},
			{
				title: '맑은 날 한강에서 모여서 마시고 싶은 술은?',
				imageUrl:
					'https://zuzu-resource.s3.ap-northeast-2.amazonaws.com/worlcup/thumbnail/worldcup_thumbnail_duo_sun.png',
				withWhoCode: 'DUO',
				withWhoTitle: '옹기종기 모여',
				withWhoContent: '여럿이서 먹어요',
				situationCode: 'SUN',
				situationTitle: '해가 쨍쨍',
				situationContent: '한강에서 헤쳐모이는센치하고 꿀꿀한',
				round: [
					{
						title: '가볍게',
						count: 8,
					},
					{
						title: '무난하게',
						count: 16,
					},
					{
						title: '섬세하게',
						count: 32,
					},
				],
			},
			{
				title: '여럿이서 가볍게 한 잔 나누고 싶은 술은?',
				imageUrl:
					'https://zuzu-resource.s3.ap-northeast-2.amazonaws.com/worlcup/thumbnail/worldcup_thumbnail_duo_low.png',
				withWhoCode: 'DUO',
				withWhoTitle: '옹기종기 모여',
				withWhoContent: '여럿이서 먹어요',
				situationCode: 'LOW',
				situationTitle: '텐션 도수가 낮은 술',
				situationContent: '가볍게 한 잔 하는신나니까 가보자고',
				round: [
					{
						title: '가볍게',
						count: 8,
					},
					{
						title: '무난하게',
						count: 16,
					},
					{
						title: '섬세하게',
						count: 32,
					},
				],
			},
			{
				title: '모임에서 분위기 끌어올릴 때 마시고 싶은 술은?',
				imageUrl:
					'https://zuzu-resource.s3.ap-northeast-2.amazonaws.com/worlcup/thumbnail/worldcup_thumbnail_duo_tension.png',
				withWhoCode: 'DUO',
				withWhoTitle: '옹기종기 모여',
				withWhoContent: '여럿이서 먹어요',
				situationCode: 'TENSION',
				situationTitle: '밝은 또 한 건 해냈다',
				situationContent: '다같이 분위기 업되는점심식사와 함께 한 잔',
				round: [
					{
						title: '가볍게',
						count: 8,
					},
					{
						title: '무난하게',
						count: 16,
					},
					{
						title: '섬세하게',
						count: 32,
					},
				],
			},
			{
				title: '하루를 마무리하는 저녁에 모여서 마시고 싶은 술은?',
				imageUrl:
					'https://zuzu-resource.s3.ap-northeast-2.amazonaws.com/worlcup/thumbnail/worldcup_thumbnail_duo_night.png',
				withWhoCode: 'DUO',
				withWhoTitle: '옹기종기 모여',
				withWhoContent: '여럿이서 먹어요',
				situationCode: 'NIGHT',
				situationTitle: '어둑한 저녁',
				situationContent: '하루를 마무리하는하루를 마무리하는 저녁',
				round: [
					{
						title: '가볍게',
						count: 8,
					},
					{
						title: '무난하게',
						count: 16,
					},
					{
						title: '섬세하게',
						count: 32,
					},
				],
			},
		];

		await connection.createQueryBuilder().insert().into(Worldcup).values(insertValues).orIgnore().execute();
	}
}
