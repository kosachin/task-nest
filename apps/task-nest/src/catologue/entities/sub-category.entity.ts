import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { AbstractEntity } from '@app/common';
import { MainCategoryEntity } from './main-category.entity';
import { ServiceItemEntity } from './service-item.entity';

@Entity('sub_categories')
export class SubCategoryEntity extends AbstractEntity {
  @Column() name: string;

  @ManyToOne(() => MainCategoryEntity, (main) => main.subCategories, {
    onDelete: 'CASCADE',
  })
  mainCategory: MainCategoryEntity;

  @OneToMany(() => ServiceItemEntity, (serviceItem) => serviceItem.subCategory)
  serviceItems: ServiceItemEntity[];
}
