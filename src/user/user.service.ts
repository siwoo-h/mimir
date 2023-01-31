import { EntityRepository } from '@mikro-orm/mysql';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';

import { UpdateUserDto } from '@src/user/dto/in/update-user.dto';
import { User } from '@src/user/entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>
  ) {}

  async create({ email, nickname, password }) {
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
