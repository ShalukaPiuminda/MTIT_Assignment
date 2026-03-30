import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Inventory {
  @Prop()
  productId: string;

  @Prop()
  quantity: number;

  @Prop()
  warehouseLocation: string;
}

export const InventorySchema = SchemaFactory.createForClass(Inventory);
