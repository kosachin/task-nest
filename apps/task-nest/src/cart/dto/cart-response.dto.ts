import { ServiceItemEntity } from '../../catologue/entities/service-item.entity';

export class CartItemResponseDto {
  id: string;
  serviceItemId: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  specialInstructions?: string;
  scheduledDate?: Date;
  isScheduled: boolean;
  serviceItem: {
    id: string;
    name: string;
    description: string;
    durationMinutes?: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

export class CartSummaryResponseDto {
  items: CartItemResponseDto[];
  totalItems: number;
  subtotal: number;
  totalAmount: number;
  scheduledItems: number;
  immediateItems: number;
}

export class AddToCartResponseDto {
  message: string;
  cartItem: CartItemResponseDto;
  cartSummary: CartSummaryResponseDto;
} 