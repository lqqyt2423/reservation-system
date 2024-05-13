import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ReservationsService } from './reservations.service';
import { Reservation, ReservationStateEnum } from './reservation.model';
import { ObjectIdValidationPipe, ZodValidationPipe } from '../validation.pipe';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import {
  UpdateReservationInput,
  updateReservationSchema,
} from './reservation.dto';

@Resolver(() => Reservation)
export class ReservationsResolver {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Query(() => [Reservation])
  async reservations(
    @Args('expectedArrivalTime', { nullable: true }) expectedArrivalTime?: Date,
    @Args('status', { nullable: true }) status?: ReservationStateEnum,
  ): Promise<Reservation[]> {
    return await this.reservationsService.findAll({
      expectedArrivalTime,
      status,
    });
  }

  @Query(() => Reservation)
  async reservation(
    @Args('id', ObjectIdValidationPipe) id: string,
  ): Promise<Reservation> {
    const reservation = await this.reservationsService.findOne(id);
    if (!reservation) throw new NotFoundException();
    return reservation;
  }

  @Mutation(() => Reservation)
  async updateReservation(
    @Args('id', ObjectIdValidationPipe) id: string,
    @Args('input', new ZodValidationPipe(updateReservationSchema))
    input: UpdateReservationInput,
  ): Promise<Reservation> {
    const reservation = await this.reservationsService.findOne(id);
    if (!reservation) throw new NotFoundException();
    return (await this.reservationsService.update(id, input)) as Reservation;
  }

  @Mutation(() => Reservation)
  async confirmReservation(
    @Args('id', ObjectIdValidationPipe) id: string,
  ): Promise<Reservation> {
    const reservation = await this.reservationsService.findOne(id);
    if (!reservation) throw new NotFoundException();
    if (reservation.status !== ReservationStateEnum.PENDING)
      throw new BadRequestException('Invalid status');
    return (await this.reservationsService.markStatus(
      id,
      ReservationStateEnum.CONFIRMED,
    )) as Reservation;
  }

  @Mutation(() => Reservation)
  async cancelReservation(
    @Args('id', ObjectIdValidationPipe) id: string,
  ): Promise<Reservation> {
    const reservation = await this.reservationsService.findOne(id);
    if (!reservation) throw new NotFoundException();
    if (reservation.status !== ReservationStateEnum.PENDING)
      throw new BadRequestException('Invalid status');
    return (await this.reservationsService.markStatus(
      id,
      ReservationStateEnum.CANCELLED,
    )) as Reservation;
  }
}
