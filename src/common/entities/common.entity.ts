import { CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { IsUUID } from 'class-validator';
import { Exclude } from 'class-transformer';

export abstract class CommonEntity {
	@IsUUID()
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@CreateDateColumn({
		type: 'timestamptz' /* timestamp with time zone. */,
	})
	createdAt: Date;

	@UpdateDateColumn({ type: 'timestamptz' })
	updatedAt: Date;

	// Soft Delete (기존에는 null, 삭제시에 timestamp를 찍는다.)
	// XXX: Need to discuss delete policy.
	@Exclude()
	@DeleteDateColumn({ type: 'timestamptz' })
	deletedAt?: Date | null;
}
