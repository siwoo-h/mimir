import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from '@src/user/dto/user.dto';

export class GetAllUserResponse {
  @ApiProperty({ description: '사용자 목록' })
  users: UserDto[];
}
