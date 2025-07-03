import {
  Injectable,
  NotFoundException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { CartRepository } from './repositories/cart.repository';
import { ServiceItemRepository } from '../catologue/repositories';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
import { CartEntity } from './entities/cart.entity';
import {
  CartItemResponseDto,
  CartSummaryResponseDto,
  AddToCartResponseDto,
} from './dto/cart-response.dto';

@Injectable()
export class CartService {
  private readonly logger = new Logger(CartService.name);

  constructor(
    private readonly cartRepository: CartRepository,
    private readonly serviceItemRepository: ServiceItemRepository,
  ) { }

  async addToCart(userId: string, addToCartDto: AddToCartDto): Promise<AddToCartResponseDto> {
    try {
      // Ensure userId is not taken from DTO for security
      // ... existing logic, but ignore any userId in DTO

      // Validate service item exists and is active
      const serviceItem = await this.serviceItemRepository.findByCondition({
        where: { id: addToCartDto.serviceItemId, isActive: true },
      });

      if (!serviceItem) {
        throw new NotFoundException('Service item not found or inactive');
      }

      // Check if item already exists in cart
      const existingCartItem =
        await this.cartRepository.findCartItemByUserAndService(
          userId,
          addToCartDto.serviceItemId,
        );

      let cartItem: CartEntity;

      if (existingCartItem) {
        // Update existing cart item
        const newQuantity = existingCartItem.quantity + addToCartDto.quantity;
        if (newQuantity > 10) {
          throw new BadRequestException(
            'Maximum quantity limit exceeded (10 items)',
          );
        }

        cartItem = await this.updateCartItemEntity(
          existingCartItem.id,
          userId,
          {
            quantity: newQuantity,
            specialInstructions: addToCartDto.specialInstructions,
            scheduledDate: addToCartDto.scheduledDate,
            isScheduled: addToCartDto.isScheduled,
          },
        );
      } else {
        // Create new cart item
        const unitPrice = Number(serviceItem.price);
        const totalPrice = unitPrice * addToCartDto.quantity;

        cartItem = await this.cartRepository.save({
          userId,
          serviceItemId: addToCartDto.serviceItemId,
          quantity: addToCartDto.quantity,
          unitPrice,
          totalPrice,
          specialInstructions: addToCartDto.specialInstructions,
          scheduledDate: addToCartDto.scheduledDate
            ? new Date(addToCartDto.scheduledDate)
            : undefined,
          isScheduled: addToCartDto.isScheduled || false,
        });
        // Fetch the saved cart item with relations
        const foundCartItem = await this.cartRepository.findByCondition({
          where: { id: cartItem.id },
          relations: { serviceItem: true },
        });
        if (!foundCartItem) {
          throw new NotFoundException('Cart item not found after creation');
        }
        cartItem = foundCartItem;
      }

      // Get updated cart summary
      const cartSummary = await this.getCartSummary(userId);
      console.log({ cartSummary, cartItem });
      return {
        message: 'Item added to cart successfully',
        cartItem: this.mapToCartItemResponse(cartItem),
        cartSummary,
      };
    } catch (error) {
      this.logger.error(
        `Error adding item to cart: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  async getCart(userId: string): Promise<CartSummaryResponseDto> {
    try {
      const cartItems = await this.cartRepository.findUserCart(userId);
      const summary = await this.cartRepository.getCartSummary(userId);

      return {
        items: cartItems.map((item) => this.mapToCartItemResponse(item)),
        ...summary,
        totalAmount: summary.subtotal, // For now, no additional charges
      };
    } catch (error) {
      this.logger.error(`Error fetching cart: ${error.message}`, error.stack);
      throw error;
    }
  }

  async updateCartItem(
    cartItemId: string,
    userId: string,
    updateDto: UpdateCartItemDto,
  ): Promise<CartItemResponseDto> {
    const cartItem = await this.updateCartItemEntity(
      cartItemId,
      userId,
      updateDto,
    );
    return this.mapToCartItemResponse(cartItem);
  }

  private async updateCartItemEntity(
    cartItemId: string,
    userId: string,
    updateDto: UpdateCartItemDto,
  ): Promise<CartEntity> {
    try {
      const cartItem = await this.cartRepository.findByCondition({
        where: { id: cartItemId, userId },
        relations: { serviceItem: true },
      });

      if (!cartItem) {
        throw new NotFoundException('Cart item not found');
      }

      // Update quantity and recalculate total price
      const unitPrice = Number(cartItem.unitPrice);
      const totalPrice = unitPrice * updateDto.quantity;

      await this.cartRepository.update(cartItemId, {
        quantity: updateDto.quantity,
        totalPrice,
        specialInstructions: updateDto.specialInstructions,
        scheduledDate: updateDto.scheduledDate
          ? new Date(updateDto.scheduledDate)
          : undefined,
        isScheduled: updateDto.isScheduled,
      });

      // Fetch updated cart item
      const updatedCartItem = await this.cartRepository.findByCondition({
        where: { id: cartItemId, userId },
        relations: { serviceItem: true },
      });

      if (!updatedCartItem) {
        throw new NotFoundException('Cart item not found after update');
      }

      return updatedCartItem;
    } catch (error) {
      this.logger.error(
        `Error updating cart item: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  async removeFromCart(
    cartItemId: string,
    userId: string,
  ): Promise<{ message: string }> {
    try {
      const removed = await this.cartRepository.removeCartItem(
        cartItemId,
        userId,
      );

      if (!removed) {
        throw new NotFoundException('Cart item not found');
      }

      return { message: 'Item removed from cart successfully' };
    } catch (error) {
      this.logger.error(
        `Error removing cart item: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  async clearCart(userId: string): Promise<{ message: string }> {
    try {
      await this.cartRepository.clearUserCart(userId);
      return { message: 'Cart cleared successfully' };
    } catch (error) {
      this.logger.error(`Error clearing cart: ${error.message}`, error.stack);
      throw error;
    }
  }

  async getCartSummary(userId: string): Promise<CartSummaryResponseDto> {
    const cartItems = await this.cartRepository.findUserCart(userId);
    const summary = await this.cartRepository.getCartSummary(userId);

    return {
      items: cartItems.map((item) => this.mapToCartItemResponse(item)),
      ...summary,
      totalAmount: summary.subtotal,
    };
  }

  private mapToCartItemResponse(cartItem: CartEntity): CartItemResponseDto {
    return {
      id: cartItem.id,
      serviceItemId: cartItem.serviceItemId,
      quantity: cartItem.quantity,
      unitPrice: Number(cartItem.unitPrice),
      totalPrice: Number(cartItem.totalPrice),
      specialInstructions: cartItem.specialInstructions,
      scheduledDate: cartItem.scheduledDate || undefined,
      isScheduled: cartItem.isScheduled,
      serviceItem: {
        id: cartItem.serviceItem.id,
        name: cartItem.serviceItem.name,
        description: cartItem.serviceItem.description,
        durationMinutes: cartItem.serviceItem.durationMinutes,
      },
      createdAt: cartItem.createdAt,
      updatedAt: cartItem.updatedAt || cartItem.createdAt,
    };
  }
}
