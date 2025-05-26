// profile.entity.ts
import { Entity, Column, ManyToOne } from 'typeorm';
import { AbstractEntity } from '@app/common';
import { UserEntity } from '../../users/entities/user.entity';

@Entity('profiles')
export class ProfileEntity extends AbstractEntity {
  @Column()
  name: string;

  @Column()
  addressLine1: string;

  @Column({ nullable: true })
  addressLine2: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  country: string;

  @Column()
  postalCode: string;

  @ManyToOne(() => UserEntity, (user) => user.profiles, { onDelete: 'CASCADE' })
  user: UserEntity;
}
