import { CommonEntity } from '@src/common/entities/common.entity';
import { IsString } from 'class-validator';
import { Column, Entity } from 'typeorm';

@Entity()
export class WorldCup extends CommonEntity {
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
}
