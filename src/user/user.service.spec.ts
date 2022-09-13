import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '@src/user/user.service';
import { User } from '@src/user/entities/user.entity';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [MikroOrmModule.forFeature([User])],
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
