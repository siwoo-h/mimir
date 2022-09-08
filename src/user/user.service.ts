import { EntityRepository } from '@mikro-orm/mysql';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '@src/user/dto/create-user.dto';
import { UpdateUserDto } from '@src/user/dto/update-user.dto';
import { User } from '@src/user/entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { email, nickname, password } = createUserDto;
    const user = new User(email, nickname, password);
    await this.userRepository.persistAndFlush(user);
    return user;
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
