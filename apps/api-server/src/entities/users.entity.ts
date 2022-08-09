import { Column, Entity, OneToMany } from 'typeorm';
import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { Review } from './reviews.entity';
import { CommonEntity } from './common.entity';

@Entity()
export class User extends CommonEntity {
	@IsString()
	@IsNotEmpty()
	@Column({ type: 'varchar', nullable: false })
	name: string;

	@IsString()
	@IsNotEmpty()
	@Column({ type: 'varchar', nullable: false })
	nickname: string;

	@IsEmail()
	@IsNotEmpty()
	@Column({ type: 'varchar', nullable: false })
	email: string;

	@IsNumber()
	@IsNotEmpty()
	@Column({ type: 'bigint', nullable: false, unique: true })
	social_id: number;

	@IsString()
	@IsNotEmpty()
	@Column({ type: 'varchar', nullable: false })
	type: string;

	@IsString()
	@IsNotEmpty()
	@Column({ type: 'varchar', nullable: false, default: 'aa' })
	profile_emoji: string;

	@IsString()
	@Column({ type: 'varchar', nullable: true })
	refreshToken?: string;

	@ApiProperty({
		type: () => [Review],
		description: 'The reviews of this user',
	})
	@OneToMany(() => Review, (review: Review) => review.reviewer, {
		cascade: true, // user를 통해 review가 추가, 수정, 삭제되고 사용자가 저장되면 추가된 review도 저장된다.
	})
	reviews: Review[];
}
