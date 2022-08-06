import { Column, Entity, OneToMany } from 'typeorm';
import { IsNotEmpty, IsString } from 'class-validator';

import { CommonEntity } from './common.entity';
import { User } from './users.entity';

@Entity()
export class UsersProfile extends CommonEntity {
	@IsString()
	@IsNotEmpty()
	@Column({ type: 'varchar', nullable: false })
	image_url: string;

	@OneToMany(() => User, (user) => user.profile)
	users: User[];
}
