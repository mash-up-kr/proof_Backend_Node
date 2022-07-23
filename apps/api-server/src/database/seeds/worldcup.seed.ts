import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { Worldcup } from '@src/worldcup/worldcup.entity';

export default class DrinksCategorySeed implements Seeder {
	public async run(Factory: Factory, connection: Connection): Promise<void> {
		const insertValues = [
			{
				withWhoCode: 'ALONE',
				withWhoTitle: '혼술은 진리지',
				withWhoContent: '혼자서 먹어요',
				situatoinCode: '1',
				situatoinTitle: '주륵주륵',
				situatoinContent: '창밖에 빗물 흐르는',
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
				withWhoCode: 'ALONE',
				withWhoTitle: '혼술은 진리지',
				withWhoContent: '혼자서 먹어요',
				situatoinCode: '2',
				situatoinTitle: '도수가 낮은 술',
				situatoinContent: '가볍게 한 모금 즐기는',
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
				withWhoCode: 'ALONE',
				withWhoTitle: '혼술은 진리지',
				withWhoContent: '혼자서 먹어요',
				situatoinCode: '3',
				situatoinTitle: '도수가 높은 술',
				situatoinContent: '깊게 취하고 싶은',
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
				withWhoCode: 'ALONE',
				withWhoTitle: '혼술은 진리지',
				withWhoContent: '혼자서 먹어요',
				situatoinCode: '4',
				situatoinTitle: '도수가 중간인 술',
				situatoinContent: '중간으로 취하고 싶은',
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
				withWhoCode: 'ALONE',
				withWhoTitle: '혼술은 진리지',
				withWhoContent: '혼자서 먹어요',
				situatoinCode: '5',
				situatoinTitle: '우울우울',
				situatoinContent: '센치하고 꿀꿀한',
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
				withWhoCode: 'ALONE',
				withWhoTitle: '혼술은 진리지',
				withWhoContent: '혼자서 먹어요',
				situatoinCode: '6',
				situatoinTitle: '텐션 업',
				situatoinContent: '신나니까 가보자고',
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
				withWhoCode: 'ALONE',
				withWhoTitle: '혼술은 진리지',
				withWhoContent: '혼자서 먹어요',
				situatoinCode: '7',
				situatoinTitle: '밝은 대낮',
				situatoinContent: '점심식사와 함께 한 잔',
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
				withWhoCode: 'ALONE',
				withWhoTitle: '혼술은 진리지',
				withWhoContent: '혼자서 먹어요',
				situatoinCode: '8',
				situatoinTitle: '어둑어둑',
				situatoinContent: '하루를 마무리하는 저녁',
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
				withWhoCode: 'ALONE',
				withWhoTitle: '혼술은 진리지',
				withWhoContent: '여럿이서 먹어요',
				situatoinCode: '1',
				situatoinTitle: '주륵주륵',
				situatoinContent: '창밖에 빗물 흐르는',
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
				withWhoCode: 'ALONE',
				withWhoTitle: '혼술은 진리지',
				withWhoContent: '여럿이서 먹어요',
				situatoinCode: '2',
				situatoinTitle: '도수가 낮은 술',
				situatoinContent: '가볍게 한 모금 즐기는',
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
				withWhoCode: 'ALONE',
				withWhoTitle: '혼술은 진리지',
				withWhoContent: '여럿이서 먹어요',
				situatoinCode: '3',
				situatoinTitle: '도수가 높은 술',
				situatoinContent: '깊게 취하고 싶은',
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
				withWhoCode: 'ALONE',
				withWhoTitle: '혼술은 진리지',
				withWhoContent: '여럿이서 먹어요',
				situatoinCode: '4',
				situatoinTitle: '도수가 중간인 술',
				situatoinContent: '중간으로 취하고 싶은',
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
				withWhoCode: 'ALONE',
				withWhoTitle: '혼술은 진리지',
				withWhoContent: '여럿이서 먹어요',
				situatoinCode: '5',
				situatoinTitle: '우울우울',
				situatoinContent: '센치하고 꿀꿀한',
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
				withWhoCode: 'ALONE',
				withWhoTitle: '혼술은 진리지',
				withWhoContent: '여럿이서 먹어요',
				situatoinCode: '6',
				situatoinTitle: '텐션 업',
				situatoinContent: '신나니까 가보자고',
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
				withWhoCode: 'ALONE',
				withWhoTitle: '혼술은 진리지',
				withWhoContent: '여럿이서 먹어요',
				situatoinCode: '7',
				situatoinTitle: '밝은 대낮',
				situatoinContent: '점심식사와 함께 한 잔',
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
				withWhoCode: 'ALONE',
				withWhoTitle: '혼술은 진리지',
				withWhoContent: '여럿이서 먹어요',
				situatoinCode: '8',
				situatoinTitle: '어둑어둑',
				situatoinContent: '하루를 마무리하는 저녁',
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

		await connection.createQueryBuilder().insert().into(Worldcup).values(insertValues).execute();
	}
}
