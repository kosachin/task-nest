import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { AbstractRepository } from '@app/common';
import { MainCategoryEntity } from '../entities/main-category.entity';

@Injectable()
export class MainCategoryRepository extends AbstractRepository<MainCategoryEntity> {
  constructor(
    @InjectRepository(MainCategoryEntity)
    readonly entity: Repository<MainCategoryEntity>,
  ) {
    super(entity);
  }
}
