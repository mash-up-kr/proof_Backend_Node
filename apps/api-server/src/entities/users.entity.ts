import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';
import { CommonEntity } from './common.entity';
import { Review } from './reviews.entity';
import { UsersProfile } from './users-profile.entity';

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

	@ApiProperty({
		type: () => [Review],
		description: 'The reviews of this user',
	})
	@OneToMany(() => Review, (review: Review) => review.reviewer, {
		cascade: true, // user를 통해 review가 추가, 수정, 삭제되고 사용자가 저장되면 추가된 review도 저장된다.
	})
	reviews: Review[];

	@ManyToOne(() => UsersProfile, (userProfile) => userProfile.users, { nullable: false })
	profile: UsersProfile;
}
