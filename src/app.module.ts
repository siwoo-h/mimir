import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { JwtModule, JwtService } from '@nestjs/jwt';

import { AppController } from '@src/app.controller';
import { ArticleModule } from '@src/article/article.module';
import { CommentModule } from '@src/comment/comment.module';
import { UserModule } from '@src/user/user.module';
import { UserService } from '@src/user/user.service';
import { User } from '@src/user/entities/user.entity';
import config, { AuthConfig } from '@src/common/config';
import { HttpExceptionFilter } from '@src/common/filter/http-exception.filter';
import { AuthService } from '@src/auth/service/auth.service';
import { JwtAuthGuard } from './auth/guard/local-auth.guard';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
      isGlobal: true,
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const authConfig = configService.get<AuthConfig>('auth');
        return {
          secret: authConfig.jwtSecret,
        };
      },
    }),
    MikroOrmModule.forRoot(),
    MikroOrmModule.forFeature([User]),
    ArticleModule,
    UserModule,
    CommentModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    JwtService,
    AuthService,
    UserService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
