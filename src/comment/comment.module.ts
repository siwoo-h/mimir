import { Module } from '@nestjs/common';
import { CommentService } from '@src/comment/comment.service';
import { CommentController } from '@src/comment/comment.controller';

@Module({
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
