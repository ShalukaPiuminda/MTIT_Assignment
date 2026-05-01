import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ example: 'Wireless Mouse' })
  @IsString()
  @MinLength(2)
  @MaxLength(120)
  name!: string;

  @ApiProperty({ example: 49.99 })
  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  @Max(1000000)
  price!: number;

  @ApiProperty({ example: 'Ergonomic bluetooth mouse' })
  @IsString()
  @MinLength(5)
  @MaxLength(500)
  description!: string;

  @ApiPropertyOptional({ example: 'Accessories' })
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(80)
  category?: string;

  @ApiPropertyOptional({ example: 'WM-1001' })
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(40)
  sku?: string;

  @ApiPropertyOptional({ example: 'Logitech' })
  @IsOptional()
  @IsString()
  @MaxLength(80)
  brand?: string;

  @ApiPropertyOptional({ type: [String], example: ['wireless', 'office'] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @ApiPropertyOptional({
    type: [String],
    example: ['https://example.com/image.jpg', 'image-2.jpg'],
    description:
      'Optional image list. Can be full URLs or any image path string.',
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  imageUrls?: string[];

  @ApiPropertyOptional({ example: true, default: true })
  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  isActive?: boolean;
}
