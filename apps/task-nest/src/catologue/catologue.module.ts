// profiles.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  MainCategoryRepository,
  ServiceItemRepository,
  ServiceTypeRepository,
  SubCategoryRepository,
} from './repositories';
import { MainCategoryEntity } from './entities/main-category.entity';
import { SubCategoryEntity } from './entities/sub-category.entity';
import { ServiceTypeEntity } from './entities/service-type.entity';
import { ServiceItemEntity } from './entities/service-item.entity';
import { CatologueController } from './catologue.controller';
import { CatalogueEntity } from './entities/catologue.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CatalogueEntity,
      MainCategoryEntity,
      SubCategoryEntity,
      ServiceTypeEntity,
      ServiceItemEntity,
    ]),
  ],
  providers: [
    MainCategoryRepository,
    SubCategoryRepository,
    ServiceTypeRepository,
    ServiceItemRepository,
  ],
  controllers: [CatologueController],
})
export class CatologueModule {}
