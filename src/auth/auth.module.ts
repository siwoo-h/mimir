import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { UserModule } from '@src/user/user.module';
import { LocalStrategy } from '@src/auth/local.strategy';
import { AuthService } from '@src/auth/service/auth.service';

@Module({
  imports: [UserModule, PassportModule],
  providers: [AuthService, LocalStrategy],
})
export class AuthModule {}
