// profiles.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProfileEntity } from './entities/profile.entity';
import { ProfilesService } from './profiles.service';
import { ProfilesController } from './profiles.controller';
import { UsersService } from '../users/users.service';
import { UsersRepository } from '../users/users.repository';
import { UserEntity } from '../users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProfileEntity, UserEntity])],
  providers: [ProfilesService, UsersService, UsersRepository],
  controllers: [ProfilesController],
})
export class ProfilesModule {}
