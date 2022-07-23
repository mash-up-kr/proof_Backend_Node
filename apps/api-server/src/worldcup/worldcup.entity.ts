import { CommonEntity } from '@src/common/entities/common.entity';
import { SimpleCommonEntity } from '@src/common/entities/simple-common.entity';
import { IsString } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class WorldCup extends SimpleCommonEntity {
	@IsString()
	@Column({ name: 'with_who_code', type: 'varchar', nullable: false })
	withWhoCode: string;

	@IsString()
	@Column({ name: 'with_who_title', type: 'varchar', nullable: false })
	withWhoTitle: string;

	@IsString()
	@Column({ name: 'with_who_content', type: 'varchar', nullable: false })
	withWhoContent: string;
	@IsString()
	@Column({ name: 'situatoin_code', type: 'varchar', nullable: false })
	situatoinCode: string;

	@IsString()
	@Column({ name: 'situatoin_title', type: 'varchar', nullable: false })
	situatoinTitle: string;

	@IsString()
	@Column({ name: 'situatoin_content', type: 'varchar', nullable: false })
	situatoinContent: string;

	@Column({ type: 'jsonb' })
	round?: Round[];
}

class Round {
	title: string;
	count: number;
}
