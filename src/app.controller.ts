import { Body, Controller, HttpException, Post, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtService } from '@nestjs/jwt';

import { CreateUserDto } from '@src/auth/dto/in/create-user.dto';
import { PostSignInDto } from '@src/auth/dto/in/post-sign-in.dto';
import { AuthService } from '@src/auth/service/auth.service';
import { PostUserResponse } from '@src/user/dto/out/post-user.response.dto';
import { LocalAuthGuard } from '@src/common/guard/local-auth.guard';

@ApiTags('/')
@Controller()
export class AppController {
  constructor(private jwtService: JwtService, private readonly authService: AuthService) {}

  @Post('sign-up')
  @ApiOperation({ summary: '회원가입', description: '회원가입' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: 201, description: 'Created', type: PostUserResponse })
  async createUser(@Body() createUserDto: CreateUserDto): Promise<PostUserResponse> {
    const user = await this.authService.create(createUserDto);
    return { id: user.id };
  }

  @Post('sign-in')
  @ApiOperation({ summary: '로그인', description: '로그인' })
  @ApiBody({ type: PostSignInDto })
  @UseGuards(LocalAuthGuard)
  async signIn(@Body() postSignInDto: PostSignInDto): Promise<any> {
    const user = await this.authService.validateUser(postSignInDto.email, postSignInDto.password);
    if (!user) {
      throw new HttpException({ message: 'Invalid account' }, 400);
    }
    return this.authService.login(user);
  }
}
