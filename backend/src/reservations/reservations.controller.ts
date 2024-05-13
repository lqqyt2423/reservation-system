import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { Reservation, ReservationStateEnum } from './reservation.model';
import {
  CreateReservationDto,
  UpdateReservationDto,
  createReservationSchema,
  updateReservationSchema,
} from './reservation.dto';
import { ObjectIdValidationPipe, ZodValidationPipe } from '../validation.pipe';

@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Get(':id')
  async findOne(
    @Param('id', ObjectIdValidationPipe) id: string,
  ): Promise<Reservation> {
    const reservation = await this.reservationsService.findOne(id);
    if (!reservation) throw new NotFoundException();
    return reservation;
  }

  @Post()
  async create(
    @Body(new ZodValidationPipe(createReservationSchema))
    payload: CreateReservationDto,
  ): Promise<{ _id: string }> {
    const data = await this.reservationsService.create(payload);
    return { _id: data._id };
  }

  @Put(':id')
  async update(
    @Param('id', ObjectIdValidationPipe) id: string,
    @Body(new ZodValidationPipe(updateReservationSchema))
    payload: UpdateReservationDto,
  ): Promise<void> {
    const reservation = await this.reservationsService.findOne(id);
    if (!reservation) throw new NotFoundException();
    await this.reservationsService.update(id, payload);
  }

  @Delete(':id')
  async delete(@Param('id', ObjectIdValidationPipe) id: string): Promise<void> {
    const reservation = await this.reservationsService.findOne(id);
    if (!reservation) throw new NotFoundException();
    if (reservation.status !== ReservationStateEnum.PENDING)
      throw new BadRequestException('Invalid status');
    await this.reservationsService.markStatus(
      id,
      ReservationStateEnum.CANCELLED,
    );
  }
}
