import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { AbstractRepository } from '@app/common';
import { ServiceItemEntity } from './../entities/service-item.entity';

@Injectable()
export class ServiceItemRepository extends AbstractRepository<ServiceItemEntity> {
  constructor(
    @InjectRepository(ServiceItemEntity)
    readonly entity: Repository<ServiceItemEntity>,
  ) {
    super(entity);
  }
}
