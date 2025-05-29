import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { AbstractRepository } from '@app/common';
import { DeviceEntity } from './../entities/device.entity';

@Injectable()
export class DeviceRepository extends AbstractRepository<DeviceEntity> {
  constructor(
    @InjectRepository(DeviceEntity)
    readonly entity: Repository<DeviceEntity>,
  ) {
    super(entity);
  }
}
