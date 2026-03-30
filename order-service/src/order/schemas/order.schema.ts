import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { OrderStatus, PaymentMethod } from '../dto/create-order.dto';

@Schema({ timestamps: true })
export class Order {
  @Prop({ required: true, trim: true })
  customerId: string;

  @Prop({ required: true, trim: true })
  productId: string;

  @Prop({ required: true, min: 1 })
  quantity: number;

  @Prop({ enum: Object.values(OrderStatus), default: OrderStatus.PENDING })
  status: OrderStatus;

  @Prop({ trim: true })
  shippingAddress?: string;

  @Prop({ enum: Object.values(PaymentMethod) })
  paymentMethod?: PaymentMethod;

  @Prop({ min: 0 })
  totalAmount?: number;

  @Prop({ trim: true })
  notes?: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
