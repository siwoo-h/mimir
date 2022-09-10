import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '@src/user/user.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    const userDto = {
      email: 'user1@test.com',
      nickname: 'nickname',
      password: 'password',
    };
    const createdUser = service.create(userDto);
    expect(createdUser).toHaveReturned();
  });
});
