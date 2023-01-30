import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AppController } from '@src/app.controller';
import { ArticleModule } from '@src/article/article.module';
import { CommentModule } from '@src/comment/comment.module';
import { UserModule } from '@src/user/user.module';
import { AuthService } from '@src/auth/service/auth.service';
import { UserService } from '@src/user/user.service';
import { User } from '@src/user/entities/user.entity';
import config, { AuthConfig } from '@src/common/config';

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
  ],
  controllers: [AppController],
  providers: [AuthService, UserService],
})
export class TestModule {}
