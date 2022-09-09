import { Module } from '@nestjs/common';
import { UserService } from '@src/user/user.service';
import { UserController } from '@src/user/user.controller';

@Module({
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
