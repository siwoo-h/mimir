import { ApiProperty } from '@nestjs/swagger';

export class PostUserDto {
  @ApiProperty({ description: '사용자 DB id' })
  id: string;
}
