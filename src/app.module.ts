import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { AppController } from '@src/app.controller';
import { AppService } from '@src/app.service';
import { ArticleModule } from '@src/article/article.module';
import { CommentModule } from '@src/comment/comment.module';
import { UserModule } from '@src/user/user.module';

@Module({
  imports: [MikroOrmModule.forRoot(), ArticleModule, UserModule, CommentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
