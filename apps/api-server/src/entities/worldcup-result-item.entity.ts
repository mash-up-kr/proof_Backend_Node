import { IsNumber } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, RelationId } from 'typeorm';

import { Drink } from './drinks.entity';
import { WorldcupResult } from './worldcup-result.entity';

@Entity()
export class WorldcupResultItem {
	@PrimaryGeneratedColumn()
	id: number;

	@IsNumber()
	@Column({ name: 'rank_level', nullable: false, comment: '0: 1등, 1: 2등, 2: 3~4등, 3: 5~8등...' })
	rankLevel!: number;

	@IsNumber()
	@Column({ nullable: false })
	drinkId!: number;

	@JoinColumn({ name: 'drink_id' })
	@ManyToOne(() => Drink, (drink) => drink.worldcupResultItems)
	drink: Drink;

	@IsNumber()
	@Column({ name: 'worldcup_result_id' })
	worldcupResultId: number;

	@JoinColumn({ name: 'worldcup_result_id' })
	@ManyToOne(() => WorldcupResult, (worldcupResult) => worldcupResult.items, { onDelete: 'CASCADE' })
	worldcupResult: WorldcupResult;
}
