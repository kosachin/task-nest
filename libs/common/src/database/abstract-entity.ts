import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  BaseEntity as TypeOrmBaseEntity,
  BeforeUpdate,
} from 'typeorm';

export abstract class AbstractEntity extends TypeOrmBaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', nullable: true, default: null })
  updatedAt: Date | null;

  @DeleteDateColumn({ type: 'timestamptz', nullable: true })
  deletedAt?: Date | null;

  @BeforeUpdate()
  setUpdatedAt() {
    this.updatedAt = new Date();
  }
}
