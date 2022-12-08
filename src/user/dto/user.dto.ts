import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class UserDto {
  @Expose()
  @ApiProperty({ description: 'User DB id', uniqueItems: true })
  readonly id: string;

  @Expose()
  @ApiProperty({ description: '이메일', uniqueItems: true })
  readonly email: string;

  @Expose()
  @ApiProperty({ description: '닉네임', uniqueItems: true })
  readonly nickname: string;
}
