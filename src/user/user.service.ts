import { EntityRepository } from '@mikro-orm/mysql';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';

import { User } from '@src/user/entities/user.entity';
import { CreateUserServiceReq, UpdateUserDto } from '@src/user/dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>
  ) {}

  async create(createUserServiceReq: CreateUserServiceReq): Promise<User> {
    const { email, nickname, password } = createUserServiceReq;
    const user = new User(email, nickname, password);
    await this.userRepository.persistAndFlush(user);
    return user;
  }

  findAll(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  findOne(id: string): Promise<User> {
    return this.userRepository.findOne({ id });
  }

  findByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ email });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
