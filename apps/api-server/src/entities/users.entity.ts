import { Column, Entity, ManyToOne } from 'typeorm';
import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

import { CommonEntity } from './common.entity';
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

	@ManyToOne(() => UsersProfile, (userProfile) => userProfile.users, { nullable: false })
	profile: UsersProfile;
}
