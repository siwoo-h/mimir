import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { TestModule } from '@test/test.module';
import { GetAllUserDto } from '@src/user/dto/out/get-all-user.dto';

describe('UserController', () => {
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

  it('/users (GET)', async () => {
    const response = await request(app.getHttpServer()).get('/users').expect(200);
    expect(response.body).toHaveProperty('users');
  });
});
