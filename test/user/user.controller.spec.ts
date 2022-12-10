import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { TestModule } from '@test/test.module';

describe('UserController', () => {
  let app: INestApplication;
  let connection: any;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TestModule],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  beforeEach(() => {
    connection = request(app.getHttpServer());
  });

  afterAll(() => {
    app.close();
  });

  describe('GET', () => {
    test('/users', async () => {
      const response = await connection.get('/users').expect(200);
      expect(response.body).toHaveProperty('users');
    });

    test('/users/:id', async () => {
      const userId = 'some-id';
      const response = await connection.get(`/users/${userId}`);
      expect(response).toBeDefined();
    });
  });

  describe('POST', () => {
    test('/sign-up', async () => {
      const user = { email: 'new-user@test.com', nickname: 'new-user', password: 'new-user' };
      const response = await connection.post('/sign-up').send(user).expect(201);
      expect(response.body).toHaveProperty('id');
    });
  });
});
