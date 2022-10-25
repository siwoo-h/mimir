import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { UserService } from '@src/user/user.service';
import { UpdateUserDto } from '@src/user/dto/update-user.dto';
import { GetAllUserDto } from '@src/user/dto/get-all-user.dto';
import { UserDto } from '@src/user/dto/user.dto';
import { GetUserDto } from '@src/user/dto/get-user.dto';

@ApiTags('user')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create() {
    return;
  }

  @Get()
  @ApiOperation({
    summary: '모든 사용자 조회',
    description: '모든 사용자를 조회한다.',
  })
  @ApiResponse({ status: 200, description: 'OK', type: GetAllUserDto })
  async findAll(): Promise<GetAllUserDto> {
    const users = await this.userService.findAll();
    return { users: users.map((user) => UserDto.from(user)) };
  }

  @Get(':id')
  @ApiOperation({
    summary: '특정 사용자 조회',
    description: '특정 사용자를 조회한다.',
  })
  @ApiParam({
    name: 'id',
    description: 'User id',
  })
  @ApiResponse({ status: 200, description: 'OK', type: GetUserDto })
  async findOne(@Param('id') id: string): Promise<GetUserDto> {
    const user = await this.userService.findOne(id);
    return UserDto.from(user);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
