import { Module } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Reservation, ReservationSchema } from './reservation.model';
import { ReservationsController } from './reservations.controller';
import { ReservationsResolver } from './reservations.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Reservation.name, schema: ReservationSchema },
    ]),
  ],
  providers: [ReservationsService, ReservationsResolver],
  controllers: [ReservationsController],
})
export class ReservationsModule {}
