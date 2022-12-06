import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CreateUserDto } from '@src/auth/dto/in/create-user.dto';
import { PostSignInDto } from '@src/auth/dto/in/post-sign-in.dto';
import { AuthService } from '@src/auth/service/auth.service';
import { PostUserResponse } from '@src/user/dto/out/post-user.response.dto';
import { UserService } from '@src/user/user.service';
import { LocalAuthGuard } from '@src/common/guard/local-auth.guard';

@ApiTags('/')
@Controller()
export class AppController {
  constructor(private readonly authService: AuthService, private readonly userService: UserService) {}

  @Post('sign-up')
  @ApiOperation({ summary: '회원가입', description: '회원가입' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: 201, description: 'Created', type: PostUserResponse })
  async createUser(@Body() createUserDto: CreateUserDto): Promise<PostUserResponse> {
    const user = await this.authService.create(createUserDto);
    return { id: user.getId() };
  }

  @Post('sign-in')
  @UseGuards(LocalAuthGuard)
  @ApiOperation({ summary: '로그인', description: '로그인' })
  @ApiBody({ type: PostSignInDto })
  async signIn(@Body() postSignInDto: PostSignInDto): Promise<void> {
    const user = await this.userService.findByEmail(postSignInDto.email);
  }
}
