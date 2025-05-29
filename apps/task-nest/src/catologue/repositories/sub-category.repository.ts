import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { AbstractRepository } from '@app/common';
import { SubCategoryEntity } from './../entities/sub-category.entity';

@Injectable()
export class SubCategoryRepository extends AbstractRepository<SubCategoryEntity> {
  constructor(
    @InjectRepository(SubCategoryEntity)
    readonly entity: Repository<SubCategoryEntity>,
  ) {
    super(entity);
  }
}
