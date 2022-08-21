import {
  BigIntType,
  Entity,
  ManyToOne,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { Article } from '../../article/entities/article.entity';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Comment {
  @PrimaryKey({ type: BigIntType })
  id: string;

  @Property()
  content: string;

  @Property({ hidden: true })
  created_at = Date.now();

  @Property({ hidden: true })
  updated_at?: Date;

  @Property({ hidden: true })
  deleted_at?: Date;

  @ManyToOne({
    serializer: (value) => value.id,
    serializedName: 'user_id',
  }) // Equivalent of class-transformer's `@Transform()`
  user: User;

  @ManyToOne({
    serializer: (value) => value.id,
    serializedName: 'article_id',
  }) // Equivalent of class-transformer's `@Transform()`
  article: Article;
}
