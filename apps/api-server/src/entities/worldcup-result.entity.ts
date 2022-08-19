import { IsNumber } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, RelationId } from 'typeorm';

import { CommonEntity } from './common.entity';
import { Worldcup } from './worldcup.entity';
import { Drink } from './drinks.entity';
import { User } from './users.entity';

@Entity()
export class WorldcupResult extends CommonEntity {
	@Column({ name: 'rank_level', nullable: false, comment: '0: 1등, 1: 2등, 2: 3~4등, 3: 5~8등...' })
	rankLevel!: number;

	@IsNumber()
	@Column({ nullable: true })
	userId?: number;

	@IsNumber()
	@Column({ nullable: false })
	worldcupId!: number;

	@Column({ nullable: false })
	drinkId!: number;

	@JoinColumn({ name: 'user_id' })
	@ManyToOne(() => User)
	user: User;

	@JoinColumn({ name: 'worldcup_id' })
	@ManyToOne(() => Worldcup, { onDelete: 'RESTRICT' })
	worldcup: Worldcup;

	@JoinColumn({ name: 'drink_id' })
	@ManyToOne(() => Drink, (drink) => drink.worldcupResults)
	drink: Drink;
}
