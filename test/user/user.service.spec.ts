import { getRepositoryToken } from '@mikro-orm/nestjs';
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '@src/user/user.service';
import { User } from '@src/user/entities/user.entity';

const mockPostRepository = () => ({
  save: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  softDelete: jest.fn(),
  persistAndFlush: jest.fn(),
});

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: mockPostRepository(),
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('create', () => {
    const userDto = {
      email: 'user1@test.com',
      nickname: 'nickname',
      password: 'password',
    };
    const createdUser = service.create(userDto);
    expect(createdUser).toHaveReturned();
  });
});
