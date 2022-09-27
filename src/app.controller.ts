import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from '@src/app.service';
import { CreateUserDto } from '@src/user/dto/create-user.dto';
import { UserService } from '@src/user/user.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly userService: UserService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('sign-up')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
}
