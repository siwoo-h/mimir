import { getRepositoryToken } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/mysql';
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '@src/user/user.service';
import { User } from '@src/user/entities/user.entity';
import { ConfigModule } from '@nestjs/config';
import config from '@src/common/config';

const mockRepository = () => ({
  save: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  findAll: jest.fn(),
  softDelete: jest.fn(),
  persistAndFlush: jest.fn(),
});

describe('UserService', () => {
  let service: UserService;
  let repository: EntityRepository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          load: [config],
          isGlobal: true,
        }),
      ],
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: mockRepository(),
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    repository = module.get(getRepositoryToken(User));
  });

  describe('Create', () => {
    const createArgs = {
      email: 'user1@test.com',
      nickname: 'nickname',
      password: 'password',
    };
    it('success', async () => {
      const result = await service.create(createArgs);

      expect(repository.persistAndFlush).toHaveBeenCalledTimes(1);
      expect(result).toHaveProperty('id');
    });
  });

  describe('Find All', () => {
    it('success', async () => {
      const result = await service.findAll();
      expect(repository.findAll).toHaveBeenCalledTimes(1);
    });
  });
});
