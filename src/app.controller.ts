import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';

import { CreateUserDto } from '@src/user/dto/create-user.dto';
import { UserService } from '@src/user/user.service';
import { PostUserDto } from '@src/user/dto/post-user.dto';

import { AppService } from '@src/app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly userService: UserService) {}

  @Post('sign-up')
  @ApiOperation({ description: '회원가입' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: 201, description: 'Created', type: PostUserDto })
  async create(@Body() createUserDto: CreateUserDto): Promise<PostUserDto> {
    const user = await this.userService.create(createUserDto);
    return { id: user.getId() };
  }
}
