import { ApiProperty } from '@nestjs/swagger';

export class ReviewDto {
	@ApiProperty({ description: '리뷰 id' })
	id: number;

	@ApiProperty({ description: '리뷰 작성 날짜' })
	createdAt: string;

	@ApiProperty({ description: 'The answer of 어떤 분위기로 마셨나요?' })
	mood: string;

	@ApiProperty({ description: 'The answer of 이 술을 마셨던 날의 날씨는...' })
	weather: string;

	@ApiProperty({ description: 'The answer of 이 술을 마셨던 시간은...' })
	time: string;

	@ApiProperty({
		description: 'The answer of 가벼워요(Light)/무거워요(Heavy) 1~3 부턴 light, 4~6 부턴 heavy',
	})
	isHeavy: string;

	@ApiProperty({ description: 'The answer of 달아요(Sweet)/써요(Bitter) 1~3 부턴 sweet, 4~6 부턴 bitter' })
	isBitter: string;

	@ApiProperty({ description: 'The answer of 은은한 술맛(Mild)/찐한 술맛(Strong) 1~3 부턴 mild, 4~6 부턴 strong' })
	isStrong: string;

	@ApiProperty({
		description:
			'The answer of 부드러운 목넘김(Smooth)/화끈거리는 목넘김(Burning) 1~3 부턴 smooth, 4~6 부턴 burning',
	})
	isBurning: string;

	@ApiProperty({ description: 'The answer of 이 술은 어떤 느낌이었나요?' })
	taste: string;

	constructor({ ...args }) {
		this.id = args.id;
		this.createdAt = args.createdAt;
		this.mood = args.mood;
		this.weather = args.weather;
		this.time = args.time;
		this.isHeavy = args.isHeavy;
		this.isBitter = args.isBitter;
		this.isStrong = args.isStrong;
		this.isBurning = args.isBurning;
		this.taste = args.taste;
	}
}
