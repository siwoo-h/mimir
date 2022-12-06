import { ApiProperty } from '@nestjs/swagger';

export class PostUserResponse {
  @ApiProperty({ description: '사용자 DB id' })
  id: string;
}
