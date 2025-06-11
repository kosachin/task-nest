import { Column, Entity, OneToMany } from 'typeorm';
import { MainCategoryEntity } from './main-category.entity';
import { AbstractEntity } from '@app/common';

@Entity('catalogues')
export class CatalogueEntity extends AbstractEntity {
  @Column({ unique: true }) name: string; // e.g., 'Electrician', 'Salon'

  @OneToMany(() => MainCategoryEntity, (main) => main.catalogue)
  mainCategories: MainCategoryEntity[];
}
