import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Inventory {
  @Prop({ required: true, trim: true })
  productId: string;

  @Prop({ required: true, min: 0 })
  quantity: number;

  @Prop({ required: true, trim: true })
  warehouseLocation: string;

  @Prop({ default: 0, min: 0 })
  reservedQuantity?: number;

  @Prop({ default: 10, min: 0 })
  reorderLevel?: number;

  @Prop({ trim: true })
  supplierName?: string;

  @Prop({ trim: true })
  batchNumber?: string;

  @Prop()
  expiryDate?: Date;
}

export const InventorySchema = SchemaFactory.createForClass(Inventory);
