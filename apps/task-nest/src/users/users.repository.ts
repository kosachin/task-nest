import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { AbstractRepository } from '@app/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersRepository extends AbstractRepository<UserEntity> {
  constructor(
    @InjectRepository(UserEntity)
    readonly userEntity: Repository<UserEntity>,
  ) {
    super(userEntity);
  }
}
