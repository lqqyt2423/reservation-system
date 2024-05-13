import { Field, InputType } from '@nestjs/graphql';
import * as moment from 'moment';
import { z } from 'zod';

export const createReservationSchema = z.object({
  guestName: z.string().min(1),
  guestContactInfo: z.string().min(1),
  expectedArrivalTime: z
    .string()
    .date()
    .transform((val) => moment(val).toDate()),
  reservedTableSize: z.number().gte(1),
});

export type CreateReservationDto = z.infer<typeof createReservationSchema>;

export const updateReservationSchema = createReservationSchema.partial();

export type UpdateReservationDto = z.infer<typeof updateReservationSchema>;

@InputType()
export class UpdateReservationInput implements UpdateReservationDto {
  @Field({ nullable: true })
  guestName: string;

  @Field({ nullable: true })
  guestContactInfo: string;

  @Field({ nullable: true })
  expectedArrivalTime: Date;

  @Field({ nullable: true })
  reservedTableSize: number;
}
