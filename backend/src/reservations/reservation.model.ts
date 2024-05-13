import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum ReservationStateEnum {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  CANCELLED = 'cancelled',
}

@ObjectType()
@Schema({
  timestamps: true,
})
export class Reservation extends Document {
  @Field()
  _id: string;

  @Field()
  @Prop({ required: true })
  guestName: string;

  @Field()
  @Prop({ required: true })
  guestContactInfo: string;

  @Field()
  @Prop({ required: true })
  expectedArrivalTime: Date;

  @Field()
  @Prop({ required: true })
  reservedTableSize: number;

  @Field()
  @Prop({
    required: true,
    enum: Object.values(ReservationStateEnum),
    default: ReservationStateEnum.PENDING,
  })
  status: ReservationStateEnum;
}

export const ReservationSchema = SchemaFactory.createForClass(Reservation);
