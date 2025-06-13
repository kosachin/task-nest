import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { AbstractRepository } from '@app/common';
import { CatalogueEntity } from '../entities/catologue.entity';

@Injectable()
export class CatologueRepository extends AbstractRepository<CatalogueEntity> {
  constructor(
    @InjectRepository(CatalogueEntity)
    readonly entity: Repository<CatalogueEntity>,
  ) {
    super(entity);
  }
}
