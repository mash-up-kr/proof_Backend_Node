import { IsString } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { WorldcupRoundDto } from '../modules/worldcup/dto/worldcup.dto';
import { CommonEntity } from './common.entity';

@Entity()
export class Worldcup extends CommonEntity {
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
	@Column({ name: 'situation_code', type: 'varchar', nullable: false })
	situationCode: string;

	@IsString()
	@Column({ name: 'situation_title', type: 'varchar', nullable: false })
	situationTitle: string;

	@IsString()
	@Column({ name: 'situation_content', type: 'varchar', nullable: false })
	situationContent: string;

	@Column({ type: 'jsonb' })
	round: WorldcupRoundDto[];
}
