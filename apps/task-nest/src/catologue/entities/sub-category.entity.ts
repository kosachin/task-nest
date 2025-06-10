import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { AbstractEntity } from '@app/common';
import { MainCategoryEntity } from './main-category.entity';
import { DeviceEntity } from './device.entity';

@Entity('sub_categories')
export class SubCategoryEntity extends AbstractEntity {
  @Column() name: string;

  @ManyToOne(() => MainCategoryEntity, (main) => main.subCategories, {
    onDelete: 'CASCADE',
  })
  mainCategory: MainCategoryEntity;

  @OneToMany(() => DeviceEntity, (device) => device.subCategory)
  devices: DeviceEntity[];
}
