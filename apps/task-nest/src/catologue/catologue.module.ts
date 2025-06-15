// profiles.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  CatologueRepository,
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
import { CatologueService } from './catologue.service';

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
    CatologueRepository,
    MainCategoryRepository,
    SubCategoryRepository,
    ServiceTypeRepository,
    ServiceItemRepository,
    CatologueService,
  ],
  controllers: [CatologueController],
})
export class CatologueModule {}
