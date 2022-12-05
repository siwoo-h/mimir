import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CreateUserDto } from '@src/user/dto/in/create-user.dto';
import { UserService } from '@src/user/user.service';
import { PostUserResponse } from '@src/user/dto/out/post-user.response.dto';

@ApiTags('app')
@Controller()
export class AppController {
  constructor(private readonly userService: UserService) {}

  @Post('sign-up')
  @ApiOperation({ summary: '회원가입', description: '회원가입' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: 201, description: 'Created', type: PostUserResponse })
  async createUser(@Body() createUserDto: CreateUserDto): Promise<PostUserResponse> {
    const user = await this.userService.create(createUserDto);
    return { id: user.getId() };
  }
}
