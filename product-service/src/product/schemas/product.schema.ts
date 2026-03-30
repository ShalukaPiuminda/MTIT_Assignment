import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Product {
  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ required: true, min: 0 })
  price: number;

  @Prop({ required: true, trim: true })
  description: string;

  @Prop({ trim: true })
  category?: string;

  @Prop({ trim: true })
  sku?: string;

  @Prop({ trim: true })
  brand?: string;

  @Prop({ type: [String], default: [] })
  tags?: string[];

  @Prop({ type: [String], default: [] })
  imageUrls?: string[];

  @Prop({ default: true })
  isActive?: boolean;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
