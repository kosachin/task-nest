import { UserEntity } from './../users/entities/user.entity';
import { SessionEntity } from '../auth/entities/session.entity';
import { ProfileEntity } from '../profiles/entities/profile.entity';
import { DeviceEntity } from '../catologue/entities/device.entity';
import { ServiceItemEntity } from '../catologue/entities/service-item.entity';
import { ServiceTypeEntity } from '../catologue/entities/service-type.entity';
import { MainCategoryEntity } from '../catologue/entities/main-category.entity';
import { SubCategoryEntity } from '../catologue/entities/sub-category.entity';

export default [
  UserEntity,
  SessionEntity,
  ProfileEntity,
  DeviceEntity,
  ServiceItemEntity,
  ServiceTypeEntity,
  MainCategoryEntity,
  SubCategoryEntity,
];
