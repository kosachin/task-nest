import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CartEntity } from '../entities/cart.entity';
import { AbstractRepository } from '@app/common';

@Injectable()
export class CartRepository extends AbstractRepository<CartEntity> {
  constructor(
    @InjectRepository(CartEntity)
    private readonly cartRepository: Repository<CartEntity>,
  ) {
    super(cartRepository);
  }

  async findUserCart(userId: string): Promise<CartEntity[]> {
    return await this.findWithRelations({
      where: { userId },
      relations: {
        serviceItem: {
          serviceType: true,
          subCategory: {
            mainCategory: true,
          },
        },
      },
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findCartItemByUserAndService(
    userId: string,
    serviceItemId: string,
  ): Promise<CartEntity | null> {
    return await this.findByCondition({
      where: { userId, serviceItemId },
      relations: {
        serviceItem: true,
      },
    });
  }

  async getCartSummary(userId: string): Promise<{
    totalItems: number;
    subtotal: number;
    scheduledItems: number;
    immediateItems: number;
  }> {
    const result = await this.cartRepository
      .createQueryBuilder('cart')
      .select([
        'COUNT(*) as totalitems',
        'SUM(cart.totalPrice) as subtotal',
        'SUM(CASE WHEN cart.isScheduled = true THEN 1 ELSE 0 END) as scheduleditems',
        'SUM(CASE WHEN cart.isScheduled = false THEN 1 ELSE 0 END) as immediateitems',
      ])
      .where('cart.userId = :userId', { userId })
      .getRawOne();

    return {
      totalItems: parseInt(result.totalitems) || 0,
      subtotal: parseFloat(result.subtotal) || 0,
      scheduledItems: parseInt(result.scheduleditems) || 0,
      immediateItems: parseInt(result.immediateitems) || 0,
    };
  }

  async clearUserCart(userId: string): Promise<void> {
    await this.cartRepository.delete({ userId });
  }

  async removeCartItem(cartItemId: string, userId: string): Promise<boolean> {
    const result = await this.cartRepository.delete({
      id: cartItemId,
      userId,
    });
    return (result.affected || 0) > 0;
  }
} 