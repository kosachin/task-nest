import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  Request,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
import { CartSummaryResponseDto, AddToCartResponseDto } from './dto/cart-response.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) { }

  @Post('add')
  @HttpCode(HttpStatus.CREATED)
  async addToCart(
    @Request() req: any,
    @Body() addToCartDto: AddToCartDto,
  ): Promise<AddToCartResponseDto> {
    const userId = req.user.sub;
    return await this.cartService.addToCart(userId, addToCartDto);
  }

  @Get()
  async getCart(@Request() req: any): Promise<CartSummaryResponseDto> {
    const userId = req.user.sub;
    return await this.cartService.getCart(userId);
  }

  @Put(':cartItemId')
  async updateCartItem(
    @Request() req: any,
    @Param('cartItemId') cartItemId: string,
    @Body() updateCartItemDto: UpdateCartItemDto,
  ) {
    const userId = req.user.sub;
    return await this.cartService.updateCartItem(cartItemId, userId, updateCartItemDto);
  }

  @Delete(':cartItemId')
  @HttpCode(HttpStatus.OK)
  async removeFromCart(
    @Request() req: any,
    @Param('cartItemId') cartItemId: string,
  ) {
    const userId = req.user.sub;
    return await this.cartService.removeFromCart(cartItemId, userId);
  }

  @Delete()
  @HttpCode(HttpStatus.OK)
  async clearCart(@Request() req: any) {
    const userId = req.user.sub;
    return await this.cartService.clearCart(userId);
  }

  @Get('summary')
  async getCartSummary(@Request() req: any): Promise<CartSummaryResponseDto> {
    const userId = req.user.sub;
    return await this.cartService.getCartSummary(userId);
  }
} 