import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { NestFactory } from '@nestjs/core';

describe('App (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    process.env.MONGO_URI = 'mongodb://localhost:27017/reservation_system_test';
    app = await NestFactory.create(AppModule);
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer()).get('/').expect(200);
  });

  it('/api/reservations e2e', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/reservations')
      .send({
        guestName: 'tom',
        guestContactInfo: '18800000000',
        expectedArrivalTime: '2024-05-15',
        reservedTableSize: 1,
      });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('_id');

    const getResp = await request(app.getHttpServer()).get(
      `/api/reservations/${response.body._id}`,
    );
    expect(getResp.status).toBe(200);
    expect(getResp.body.guestName).toBe('tom');
    expect(getResp.body.status).toBe('pending');
  });
});
