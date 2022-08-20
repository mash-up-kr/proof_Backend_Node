import { IsNotEmpty, IsString } from 'class-validator';
import { Column, Entity, OneToMany } from 'typeorm';

import { CommonEntity } from './common.entity';
import { User } from './users.entity';

@Entity()
export class UsersProfile extends CommonEntity {
	@IsString()
	@IsNotEmpty()
	@Column({ name: 'image_url', type: 'varchar', nullable: false })
	imageUrl: string;

	@OneToMany(() => User, (user) => user.profile)
	users: User[];
}
