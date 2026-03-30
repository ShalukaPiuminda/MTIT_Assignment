import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Customer {
  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ required: true, lowercase: true, trim: true })
  email: string;

  @Prop({ required: true, trim: true })
  phone: string;

  @Prop({ trim: true })
  address?: string;

  @Prop({ trim: true })
  city?: string;

  @Prop({ trim: true })
  country?: string;

  @Prop()
  dateOfBirth?: Date;

  @Prop({ default: 0, min: 0 })
  loyaltyPoints?: number;

  @Prop({ default: true })
  isActive?: boolean;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
