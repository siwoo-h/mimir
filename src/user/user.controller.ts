import { Controller, Get, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { HttpExceptionDto } from '@src/common/dto/http-exception.dto';

import { UserService } from '@src/user/user.service';
import { UpdateUserDto } from '@src/user/dto/in/update-user.dto';
import { UserDto } from '@src/user/dto/user.dto';
import { GetAllUserResponse } from '@src/user/dto/out/get-all-user.response.dto';
import { GetUserResponse } from '@src/user/dto/out/get-user.response.dto';

@ApiTags('user')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({
    summary: '모든 사용자 조회',
    description: '모든 사용자를 조회한다.',
  })
  @ApiResponse({ status: 200, description: 'OK', type: GetAllUserResponse })
  async findAll(): Promise<GetAllUserResponse> {
    const users = await this.userService.findAll();
    return { users };
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
  @ApiResponse({ status: 200, description: 'OK', type: GetUserResponse })
  @ApiResponse({ status: 404, description: 'Not Found', type: HttpExceptionDto })
  async findOne(@Param('id') id: string): Promise<GetUserResponse> {
    return this.userService.findOne(id);
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
