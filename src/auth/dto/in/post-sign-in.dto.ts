import { ApiProperty } from '@nestjs/swagger';

export class PostSignInDto {
  @ApiProperty({ description: '이메일' })
  email: string;

  @ApiProperty({ description: '암호' })
  password: string;
}
