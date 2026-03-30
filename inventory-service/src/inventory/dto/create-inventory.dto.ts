import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDateString,
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateInventoryDto {
  @ApiProperty({ example: '65f1af218fa9a20ecf2f5c91' })
  @IsString()
  @MaxLength(64)
  productId: string;

  @ApiProperty({ example: 100 })
  @Type(() => Number)
  @IsInt()
  @Min(0)
  quantity: number;

  @ApiProperty({ example: 'Warehouse-A' })
  @IsString()
  @MaxLength(120)
  warehouseLocation: string;

  @ApiPropertyOptional({ example: 5, default: 0 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  reservedQuantity?: number;

  @ApiPropertyOptional({ example: 20, default: 10 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  reorderLevel?: number;

  @ApiPropertyOptional({ example: 'ACME Supplies' })
  @IsOptional()
  @IsString()
  @MaxLength(120)
  supplierName?: string;

  @ApiPropertyOptional({ example: 'BATCH-2026-04' })
  @IsOptional()
  @IsString()
  @MaxLength(80)
  batchNumber?: string;

  @ApiPropertyOptional({ example: '2027-12-31' })
  @IsOptional()
  @IsDateString()
  expiryDate?: string;
}
