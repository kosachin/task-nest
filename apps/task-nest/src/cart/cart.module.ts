import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { CartRepository } from './repositories/cart.repository';
import { CartEntity } from './entities/cart.entity';
import { ServiceItemRepository } from '../catologue/repositories';

@Module({
  imports: [
    TypeOrmModule.forFeature([CartEntity]),
  ],
  controllers: [CartController],
  providers: [CartService, CartRepository, ServiceItemRepository],
  exports: [CartService, CartRepository],
})
export class CartModule { } 