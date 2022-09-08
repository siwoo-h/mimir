import { PartialType } from '@nestjs/mapped-types';
import { CreateCommentDto } from '@src/comment/dto/create-comment.dto';

export class UpdateCommentDto extends PartialType(CreateCommentDto) {}
