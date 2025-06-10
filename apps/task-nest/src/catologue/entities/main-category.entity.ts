import { Column, Entity, OneToMany } from 'typeorm';
import { AbstractEntity } from '@app/common';
import { SubCategoryEntity } from './sub-category.entity';

@Entity('main_categories')
export class MainCategoryEntity extends AbstractEntity {
  @Column({ unique: true }) name: string;

  @Column({ nullable: true }) iconUrl: string;

  @OneToMany(() => SubCategoryEntity, (sub) => sub.mainCategory)
  subCategories: SubCategoryEntity[];
}
