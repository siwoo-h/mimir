import { BigIntType, Entity, ManyToOne, PrimaryKey, Property, types } from '@mikro-orm/core';
import { Article } from '@src/article/entities/article.entity';
import { User } from '@src/user/entities/user.entity';

@Entity()
export class Comment {
  @PrimaryKey({ type: types.integer, unsigned: true, nullable: false })
  private id: string;

  @Property({ type: types.string, length: 255 })
  private content!: string;

  @Property({ hidden: true })
  private createdAt: Date = new Date();

  @Property({ hidden: true, onUpdate: () => new Date() })
  private updatedAt: Date = new Date();

  @Property({ hidden: true, nullable: true })
  private deletedAt?: Date;

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

  constructor(id: string, content: string, user: User) {
    this.id = id;
    this.content = content;
    this.user = user;
  }

  getId(): string {
    return this.id;
  }

  getContent(): string {
    return this.content;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  getUpdatedAt(): Date {
    return this.updatedAt;
  }

  getDeletedAt(): Date {
    return this.deletedAt;
  }
}
