import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticleModule } from './article/article.module';
import { ArticleModule } from './article/article.module';

@Module({
  imports: [MikroOrmModule.forRoot(), ArticleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
