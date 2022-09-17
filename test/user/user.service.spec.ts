import { MikroOrmModule } from '@mikro-orm/nestjs';
import { EntityManager } from '@mikro-orm/mysql';
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '@src/user/user.service';
import { User } from '@src/user/entities/user.entity';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [EntityManager, MikroOrmModule.forFeature([User])],
      providers: [UserService],
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
