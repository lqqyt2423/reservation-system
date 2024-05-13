import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Reservation, ReservationStateEnum } from './reservation.model';
import { FilterQuery, Model } from 'mongoose';
import { CreateReservationDto, UpdateReservationDto } from './reservation.dto';
import * as moment from 'moment';

@Injectable()
export class ReservationsService {
  constructor(
    @InjectModel(Reservation.name)
    private readonly reservationModel: Model<Reservation>,
  ) {}

  async create(payload: CreateReservationDto) {
    return await this.reservationModel.create(payload);
  }

  async findAll({
    expectedArrivalTime,
    status,
  }: {
    expectedArrivalTime?: Date;
    status?: ReservationStateEnum;
  } = {}) {
    const query: FilterQuery<Reservation> = {};
    if (expectedArrivalTime) {
      query.expectedArrivalTime = {
        $gte: moment(expectedArrivalTime).startOf('day').toDate(),
        $lt: moment(expectedArrivalTime).endOf('day').toDate(),
      };
    }
    if (status) query.status = status;
    return await this.reservationModel.find(query);
  }

  async findOne(id: string) {
    return await this.reservationModel.findById(id);
  }

  async update(id: string, payload: UpdateReservationDto) {
    return await this.reservationModel.findByIdAndUpdate(id, payload, {
      new: true,
    });
  }

  async markStatus(id: string, status: ReservationStateEnum) {
    return this.reservationModel.findByIdAndUpdate(
      id,
      { status },
      { new: true },
    );
  }
}
