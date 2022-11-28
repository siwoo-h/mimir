import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CreateUserDto } from '@src/auth/dto/in/create-user.dto';
import { PostUserDto } from '@src/auth/dto/out/post-user.dto';
import { PostSignInDto } from '@src/auth/dto/in/post-sign-in.dto';
import { AuthService } from '@src/auth/service/auth.service';

@ApiTags('app')
@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  @ApiOperation({ summary: '회원가입', description: '회원가입' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: 201, description: 'Created', type: PostUserDto })
  async create(@Body() createUserDto: CreateUserDto): Promise<PostUserDto> {
    const user = await this.authService.create(createUserDto);
    return { id: user.getId() };
  }

  @Post('sign-in')
  @ApiOperation({ summary: '로그인', description: '로그인' })
  @ApiBody({ type: PostSignInDto })
  async signIn(@Body() postSignInDto: PostSignInDto): Promise<void> {}
}
