import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '@src/app.module';
import { UserService } from '@src/user/user.service';

describe('POST /', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [UserService],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/sign-up', async () => {
    const createArgs = {
      email: 'user1@test.com',
      nickname: 'nickname',
      password: 'password',
    };
    // when
    const res = await request(app.getHttpServer()).post('/sign-up').send(createArgs).expect(201);

    // then
    expect(res.body).toHaveProperty('id');
  });
});
