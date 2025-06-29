import { UserEntity } from './../users/entities/user.entity';
import { SessionEntity } from '../auth/entities/session.entity';
import { ProfileEntity } from '../profiles/entities/profile.entity';
import { ServiceItemEntity } from '../catologue/entities/service-item.entity';
import { ServiceTypeEntity } from '../catologue/entities/service-type.entity';
import { MainCategoryEntity } from '../catologue/entities/main-category.entity';
import { SubCategoryEntity } from '../catologue/entities/sub-category.entity';
import { CatalogueEntity } from '../catologue/entities/catologue.entity';
import { CartEntity } from '../cart/entities/cart.entity';

export default [
  UserEntity,
  SessionEntity,
  ProfileEntity,
  ServiceItemEntity,
  ServiceTypeEntity,
  MainCategoryEntity,
  SubCategoryEntity,
  CatalogueEntity,
  CartEntity,
];
