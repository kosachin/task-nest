import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { CartRepository } from './repositories/cart.repository';
import { CartEntity } from './entities/cart.entity';
import { ServiceItemRepository } from '../catologue/repositories';
import { ServiceItemEntity } from '../catologue/entities/service-item.entity';
import { CatologueModule } from '../catologue/catologue.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CartEntity, ServiceItemEntity]),
    CatologueModule,
  ],
  controllers: [CartController],
  providers: [CartService, CartRepository, ServiceItemRepository],
  exports: [CartService, CartRepository],
})
export class CartModule { } 