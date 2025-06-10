// profiles.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  DeviceRepository,
  MainCategoryRepository,
  ServiceItemRepository,
  ServiceTypeRepository,
  SubCategoryRepository,
} from './repositories';
import { MainCategoryEntity } from './entities/main-category.entity';
import { SubCategoryEntity } from './entities/sub-category.entity';
import { DeviceEntity } from './entities/device.entity';
import { ServiceTypeEntity } from './entities/service-type.entity';
import { ServiceItemEntity } from './entities/service-item.entity';
import { CatologueController } from './catologue.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      MainCategoryEntity,
      SubCategoryEntity,
      DeviceEntity,
      ServiceTypeEntity,
      ServiceItemEntity,
    ]),
  ],
  providers: [
    MainCategoryRepository,
    SubCategoryRepository,
    DeviceRepository,
    ServiceTypeRepository,
    ServiceItemRepository,
  ],
  controllers: [CatologueController],
})
export class CatologueModule {}
