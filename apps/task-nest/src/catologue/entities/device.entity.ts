import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { AbstractEntity } from '@app/common';
import { SubCategoryEntity } from './sub-category.entity';
import { ServiceItemEntity } from './service-item.entity';

@Entity('devices')
export class DeviceEntity extends AbstractEntity {
  @Column() name: string;

  @Column({ nullable: true }) imageUrl: string;

  @ManyToOne(() => SubCategoryEntity, (sub) => sub.devices, {
    onDelete: 'CASCADE',
  })
  subCategory: SubCategoryEntity;

  @OneToMany(() => ServiceItemEntity, (item) => item.device)
  serviceItems: ServiceItemEntity[];
}
