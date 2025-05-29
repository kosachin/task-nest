import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { AbstractRepository } from '@app/common';
import { ServiceTypeEntity } from './../entities/service-type.entity';

@Injectable()
export class ServiceTypeRepository extends AbstractRepository<ServiceTypeEntity> {
  constructor(
    @InjectRepository(ServiceTypeEntity)
    readonly entity: Repository<ServiceTypeEntity>,
  ) {
    super(entity);
  }
}
