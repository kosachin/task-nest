import {
  IsUUID,
  IsInt,
  IsOptional,
  IsString,
  IsDateString,
  Min,
  Max,
} from 'class-validator';
import { Type } from 'class-transformer';

export class AddToCartDto {
  @IsUUID()
  serviceItemId: string;

  @IsInt()
  @Min(1)
  @Max(10)
  @Type(() => Number)
  quantity: number = 1;

  @IsOptional()
  @IsString()
  specialInstructions?: string;

  @IsOptional()
  @IsDateString()
  scheduledDate?: string;

  @IsOptional()
  isScheduled?: boolean = false;
}
