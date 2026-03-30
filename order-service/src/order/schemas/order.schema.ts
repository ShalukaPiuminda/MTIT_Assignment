import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Order {
  @Prop()
  customerId: string;

  @Prop()
  productId: string;

  @Prop()
  quantity: number;

  @Prop()
  status: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
