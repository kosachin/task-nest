import { AbstractEntity } from '@app/common';
import { Column, Entity, OneToMany } from 'typeorm';
import { ServiceItemEntity } from './service-item.entity';

@Entity('service_types')
export class ServiceTypeEntity extends AbstractEntity {
  @Column({ unique: true }) name: string; // Service, Package, Repair, Installation

  @OneToMany(() => ServiceItemEntity, (item) => item.serviceType)
  serviceItems: ServiceItemEntity[];
}
