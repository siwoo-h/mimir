import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { UserModule } from '@src/user/user.module';
import { LocalStrategy } from '@src/auth/local.strategy';
import { AuthService } from '@src/auth/service/auth.service';
import { JwtStrategy } from '@src/auth/jwt.strategy';
import { AuthConfig } from '@src/common/config';
import { UserService } from '@src/user/user.service';
import { User } from '@src/user/entities/user.entity';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const authConfig = configService.get<AuthConfig>('auth');
        return {
          secret: authConfig.jwtSecret || 'secret',
        };
      },
    }),
    UserModule,
    MikroOrmModule.forFeature([User]),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, UserService],
  exports: [AuthService],
})
export class AuthModule {}
