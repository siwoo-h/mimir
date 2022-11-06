import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { TestModule } from '@test/test.module';

describe('UserController', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TestModule],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  afterAll(() => {
    app.close();
  });

  describe('GET', () => {
    test('/users', async () => {
      const response = await request(app.getHttpServer())
        .get('/users')
        .expect(200);
      expect(response.body).toHaveProperty('users');
    });
  });
});
