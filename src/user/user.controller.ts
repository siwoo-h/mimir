import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserService } from '@src/user/user.service';
import { UpdateUserDto } from '@src/user/dto/update-user.dto';
import { GetAllUserDto } from '@src/user/dto/get-all-user.dto';
import { UserDto } from '@src/user/dto/user.dto';

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
  async findAll(): Promise<GetAllUserDto> {
    const users = await this.userService.findAll();
    return { users: users.map((user) => UserDto.from(user)) };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
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
