import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export enum OrderStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
}

export enum PaymentMethod {
  CARD = 'card',
  CASH_ON_DELIVERY = 'cash_on_delivery',
  BANK_TRANSFER = 'bank_transfer',
  WALLET = 'wallet',
}

export class CreateOrderDto {
  @ApiProperty({ example: '65f1af218fa9a20ecf2f5c91' })
  @IsString()
  @MaxLength(64)
  customerId!: string;

  @ApiProperty({ example: '65f1bf218fa9a20ecf2f5c99' })
  @IsString()
  @MaxLength(64)
  productId!: string;

  @ApiProperty({ example: 2 })
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(100000)
  quantity!: number;

  @ApiPropertyOptional({ enum: OrderStatus, default: OrderStatus.PENDING })
  @IsOptional()
  @IsEnum(OrderStatus)
  status?: OrderStatus;

  @ApiPropertyOptional({ example: 'No 12, Main Street, Colombo' })
  @IsOptional()
  @IsString()
  @MinLength(5)
  @MaxLength(250)
  shippingAddress?: string;

  @ApiPropertyOptional({ enum: PaymentMethod })
  @IsOptional()
  @IsEnum(PaymentMethod)
  paymentMethod?: PaymentMethod;

  @ApiPropertyOptional({ example: 99.98 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  @Max(10000000)
  totalAmount?: number;

  @ApiPropertyOptional({ example: 'Please deliver after 5 PM' })
  @IsOptional()
  @IsString()
  @MaxLength(300)
  notes?: string;
}
