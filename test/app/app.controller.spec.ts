import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { TestModule } from '@test/test.module';

describe('AppController', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TestModule],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  afterAll(() => {
    app.close();
  });

  it('/sign-up (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post('/sign-up')
      .send({ email: 'test@test.com', nickname: 'test', password: 'test1234' })
      .expect(201);

    expect(response.body).toHaveProperty('id');
  });
});
