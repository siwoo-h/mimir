import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, plainToClass } from 'class-transformer';
import { User } from '@src/user/entities/user.entity';

@Exclude()
export class UserDto {
  @Expose()
  @ApiProperty({ description: 'User DB id' })
  id: string;

  @Expose()
  @ApiProperty({ description: '이메일' })
  email: string;

  @Expose()
  @ApiProperty({ description: '닉네임' })
  nickname: string;

  static from(user: User): UserDto {
    const userDto = plainToClass(UserDto, user);
    userDto.id = user.getId();
    userDto.email = user.getEmail();
    userDto.nickname = user.getNickname();
    return userDto;
  }
}
