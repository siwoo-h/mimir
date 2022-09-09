import { Module } from '@nestjs/common';
import { ArticleService } from '@src/article/article.service';
import { ArticleController } from '@src/article/article.controller';

@Module({
  controllers: [ArticleController],
  providers: [ArticleService],
})
export class ArticleModule {}
