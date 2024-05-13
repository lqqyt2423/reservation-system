import { Test, TestingModule } from '@nestjs/testing';
import { ReservationsResolver } from './reservations.resolver';
import { ReservationsService } from './reservations.service';

describe('ReservationsResolver', () => {
  let resolver: ReservationsResolver;
  let service: ReservationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReservationsResolver,
        {
          provide: ReservationsService,
          useValue: {},
        },
      ],
    }).compile();

    resolver = module.get<ReservationsResolver>(ReservationsResolver);
    service = module.get<ReservationsService>(ReservationsService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
