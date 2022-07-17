// This is just sample user entity.
// TODO: Fix to proper user entity when ERD is fixed.

import { Exclude } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { CommonEntity } from '../common/entities/common.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class User extends CommonEntity {
	@IsEmail()
	@IsNotEmpty()
	@Column({ type: 'varchar', unique: true, nullable: false })
	email: string;

	@IsString()
	@IsNotEmpty()
	@Column({ type: 'varchar', nullable: false })
	name: string;

	@Exclude()
	@Column({ type: 'varchar', nullable: false })
	password: string;
}
