import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId } from 'mongoose';
export type OrderDocument = HydratedDocument<Order>;

class TransportLabel {
  @Prop({ required: true, type: String })
  address: string;

  @Prop({ required: true, type: String })
  city: string;

  @Prop({ required: true, type: String })
  country: string;

  @Prop({ required: true, type: String })
  email: string;

  @Prop({ required: true, type: String })
  name: string;

  @Prop({ required: true, type: String })
  zipcode: string;

  @Prop({ required: true, type: String })
  phonenumber: string;
}

export class Package {
  @Prop({ required: true, type: Number })
  height: number;

  @Prop({ required: true, type: Number })
  length: number;

  @Prop({ required: true, type: Number })
  width: number;

  @Prop({ required: true, type: Number })
  weight: number;
}

@Schema()
export class Order {
  _id: ObjectId;

  @Prop({ type: TransportLabel, required: true })
  pickup: TransportLabel;

  @Prop({ type: TransportLabel, required: true })
  dropoff: TransportLabel;

  @Prop({ type: [Package], required: true })
  packages: Package[];

  @Prop({ type: String, required: true })
  status: string;

  @Prop({ type: Number, required: true })
  total_price: number;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
