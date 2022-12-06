import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';

import { AppController } from '@src/app.controller';
import { ArticleModule } from '@src/article/article.module';
import { CommentModule } from '@src/comment/comment.module';
import { UserModule } from '@src/user/user.module';
import { UserService } from '@src/user/user.service';
import { User } from '@src/user/entities/user.entity';
import config from '@src/common/config';
import { HttpExceptionFilter } from '@src/common/filter/http-exception.filter';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
      isGlobal: true,
    }),
    MikroOrmModule.forRoot(),
    MikroOrmModule.forFeature([User]),
    ArticleModule,
    UserModule,
    CommentModule,
  ],
  controllers: [AppController],
  providers: [
    UserService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
