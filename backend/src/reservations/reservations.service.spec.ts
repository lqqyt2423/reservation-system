import { Test, TestingModule } from '@nestjs/testing';
import { ReservationsService } from './reservations.service';
import { getModelToken } from '@nestjs/mongoose';
import { Reservation, ReservationStateEnum } from './reservation.model';
import { Model } from 'mongoose';
import { CreateReservationDto } from './reservation.dto';

describe('ReservationsService', () => {
  let service: ReservationsService;
  let model: Model<Reservation>;
  let mockReservation: CreateReservationDto;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReservationsService,
        {
          provide: getModelToken(Reservation.name),
          useValue: {
            create: jest.fn(() => mockReservation),
            find: jest.fn(() => []),
            findById: jest.fn(() => mockReservation),
            findByIdAndUpdate: jest.fn(() => mockReservation),
          },
        },
      ],
    }).compile();

    service = module.get<ReservationsService>(ReservationsService);
    model = module.get<Model<Reservation>>(getModelToken(Reservation.name));
    mockReservation = {
      guestName: 'tom',
      guestContactInfo: '18800000000',
      expectedArrivalTime: new Date(),
      reservedTableSize: 1,
    };
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new reservation', async () => {
    expect(await service.create(mockReservation)).toEqual(mockReservation);
  });

  it('findAll should return an array of reservations', async () => {
    expect(await service.findAll()).toEqual([]);
  });

  it('findOne should return a reservation', async () => {
    expect(await service.findOne('id')).toEqual(mockReservation);
  });

  it('update should work', async () => {
    expect(await service.update('id', mockReservation)).toEqual(
      mockReservation,
    );
  });

  it('markStatus should work', async () => {
    jest.spyOn(model, 'findByIdAndUpdate');
    await service.markStatus('id', ReservationStateEnum.CONFIRMED);
    expect(model.findByIdAndUpdate).toHaveBeenCalledWith(
      'id',
      {
        status: ReservationStateEnum.CONFIRMED,
      },
      { new: true },
    );
  });
});
