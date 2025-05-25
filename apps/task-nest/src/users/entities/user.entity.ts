import { Entity, Column, Index } from 'typeorm';
import { AbstractEntity } from '@app/common';

export enum ROLES {
  CUSTOMER = 'CUSTOMER',
  PARTNER = 'PARTNER',
  ADMIN = 'ADMIN',
  SUPER_ADMIN = 'SUPER_ADMIN',
}

@Index(['countryCode', 'phoneNumber'], { unique: true })
@Entity('users')
export class UserEntity extends AbstractEntity {
  @Column({ type: 'varchar', length: 5 })
  countryCode: string;

  @Column({ type: 'varchar', length: 15 })
  phoneNumber: string;

  @Column({ enum: ROLES })
  role: ROLES;

  @Column({ type: 'varchar', length: 255, nullable: true })
  email?: string;
}
