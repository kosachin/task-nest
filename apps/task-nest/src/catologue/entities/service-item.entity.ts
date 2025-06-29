import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { AbstractEntity } from '@app/common';
import { ServiceTypeEntity } from './service-type.entity';
import { SubCategoryEntity } from './sub-category.entity';
import { CartEntity } from '../../cart/entities/cart.entity';

@Entity('service_items')
export class ServiceItemEntity extends AbstractEntity {
  @Column() name: string;

  @Column('numeric', { precision: 10, scale: 2 }) price: number;

  @Column('text') description: string;

  @Column({ type: 'int', nullable: true }) durationMinutes: number;

  @Column({ default: true }) isActive: boolean;

  @ManyToOne(
    () => SubCategoryEntity,
    (subCategoryEntity) => subCategoryEntity.serviceItems,
    {
      onDelete: 'CASCADE',
    },
  )
  subCategory: SubCategoryEntity;

  @ManyToOne(() => ServiceTypeEntity, (type) => type.serviceItems, {
    onDelete: 'CASCADE',
  })
  serviceType: ServiceTypeEntity;

  @OneToMany(() => CartEntity, (cart) => cart.serviceItem)
  carts: CartEntity[];
}
