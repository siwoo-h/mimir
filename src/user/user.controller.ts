import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from '@src/user/user.service';
import { UpdateUserDto } from '@src/user/dto/update-user.dto';
import { GetAllUserDto } from '@src/user/dto/get-all-user.dto';
import { UserDto } from '@src/user/dto/user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create() {
    return;
  }

  @Get()
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
