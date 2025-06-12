import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { AbstractEntity } from '@app/common';
import { SubCategoryEntity } from './sub-category.entity';
import { CatalogueEntity } from './catologue.entity';

@Entity('main_categories')
export class MainCategoryEntity extends AbstractEntity {
  @Column({ unique: true }) name: string;

  @Column({ nullable: true }) iconUrl: string;

  @ManyToOne(() => CatalogueEntity, (catalogue) => catalogue.mainCategories, {
    onDelete: 'CASCADE',
  })
  catalogue: CatalogueEntity;

  @OneToMany(() => SubCategoryEntity, (sub) => sub.mainCategory)
  subCategories: SubCategoryEntity[];
}
