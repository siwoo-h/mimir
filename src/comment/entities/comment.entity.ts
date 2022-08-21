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
  private id!: string;

  @Property()
  private content!: string;

  @Property({ hidden: true })
  private created_at: Date = new Date();

  @Property({ hidden: true, onUpdate: () => new Date() })
  private updated_at: Date = new Date();

  @Property({ hidden: true })
  private deleted_at?: Date;

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

  constructor(partial: Partial<Comment>) {
    Object.assign(this, partial);
  }

  get(): Comment {
    return this;
  }
}
