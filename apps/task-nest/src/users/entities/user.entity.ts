import {
  Entity,
  Column,
  Index,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { AbstractEntity } from '@app/common';
import { ProfileEntity } from '../../profiles/entities/profile.entity';
import { ROLES } from '@app/common/constants';

@Index(['countryCode', 'phoneNumber'], { unique: true })
@Entity('users')
export class UserEntity extends AbstractEntity {
  @Column({ type: 'varchar', length: 5 })
  countryCode: string;

  @Column({ type: 'varchar', length: 15 })
  phoneNumber: string;

  @Column({ type: 'enum', enum: ROLES, default: ROLES.CUSTOMER })
  role: ROLES;

  @Column({ type: 'varchar', length: 255, nullable: true })
  email?: string;

  @OneToMany(() => ProfileEntity, (profile) => profile.user)
  profiles: ProfileEntity[];

  @Column({ nullable: true })
  defaultProfileId: string;

  @ManyToOne(() => ProfileEntity, { nullable: true })
  @JoinColumn({ name: 'defaultProfileId' })
  defaultProfile: ProfileEntity;
}
