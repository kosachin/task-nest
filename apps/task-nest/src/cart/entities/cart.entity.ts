import { Entity, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { AbstractEntity } from '@app/common';
import { UserEntity } from '../../users/entities/user.entity';
import { ServiceItemEntity } from '../../catologue/entities/service-item.entity';

@Entity('carts')
export class CartEntity extends AbstractEntity {
  @Column({ type: 'uuid' })
  userId: string;

  @Column({ type: 'uuid' })
  serviceItemId: string;

  @Column({ type: 'int', default: 1 })
  quantity: number;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  unitPrice: number;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  totalPrice: number;

  @Column({ type: 'text', nullable: true })
  specialInstructions?: string;

  @Column({ type: 'timestamp', nullable: true })
  scheduledDate?: Date;

  @Column({ type: 'boolean', default: false })
  isScheduled: boolean;

  @ManyToOne(() => UserEntity, (user) => user.carts, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @ManyToOne(() => ServiceItemEntity, (serviceItem) => serviceItem.carts, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'serviceItemId' })
  serviceItem: ServiceItemEntity;
} 