import { Exclude, Expose, plainToClass } from 'class-transformer';
import { User } from '@src/user/entities/user.entity';

@Exclude()
export class UserDto {
  @Expose()
  id: string;

  @Expose()
  email: string;

  @Expose()
  nickname: string;

  static from(user: User): UserDto {
    const userDto = plainToClass(UserDto, user);
    userDto.id = user.getId();
    userDto.email = user.getEmail();
    userDto.nickname = user.getNickname();
    return userDto;
  }
}
