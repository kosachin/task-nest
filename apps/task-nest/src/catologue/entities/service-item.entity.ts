import { Column, Entity, ManyToOne } from 'typeorm';
import { AbstractEntity } from '@app/common';
import { ServiceTypeEntity } from './service-type.entity';
import { DeviceEntity } from './device.entity';

@Entity('service_items')
export class ServiceItemEntity extends AbstractEntity {
  @Column() name: string;

  @Column('numeric', { precision: 10, scale: 2 }) price: number;

  @Column('text') description: string;

  @Column({ type: 'int', nullable: true }) durationMinutes: number;

  @Column({ default: true }) isActive: boolean;

  @ManyToOne(() => DeviceEntity, (device) => device.serviceItems, {
    onDelete: 'CASCADE',
  })
  device: DeviceEntity;

  @ManyToOne(() => ServiceTypeEntity, (type) => type.serviceItems, {
    onDelete: 'CASCADE',
  })
  serviceType: ServiceTypeEntity;
}
