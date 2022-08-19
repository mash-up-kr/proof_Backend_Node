import { IsNumber } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, RelationId } from 'typeorm';

import { CommonEntity } from './common.entity';
import { Worldcup } from './worldcup.entity';
import { Drink } from './drinks.entity';
import { User } from './users.entity';
import { WorldcupResultItem } from './worldcup-result-item.entity';

@Entity()
export class WorldcupResult extends CommonEntity {
	@IsNumber()
	@Column({ nullable: true })
	userId?: number;

	@JoinColumn({ name: 'user_id' })
	@ManyToOne(() => User)
	user: User;

	@IsNumber()
	@Column({ nullable: false })
	worldcupId!: number;

	@JoinColumn({ name: 'worldcup_id' })
	@ManyToOne(() => Worldcup, { onDelete: 'RESTRICT' })
	worldcup: Worldcup;

	items: WorldcupResultItem[];
}
