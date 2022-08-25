import { BigIntType, Entity, ManyToOne, PrimaryKey, Property, types } from '@mikro-orm/core';
import { Article } from '../../article/entities/article.entity';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Comment {
  @PrimaryKey({ type: types.integer, unsigned: true, nullable: false })
  private _id: string;

  @Property({ type: types.string, length: 255 })
  private _content!: string;

  @Property({ hidden: true })
  private _createdAt: Date = new Date();

  @Property({ hidden: true, onUpdate: () => new Date() })
  private _updatedAt: Date = new Date();

  @Property({ hidden: true, nullable: true })
  private _deletedAt?: Date;

  @ManyToOne({
    serializer: (value) => value.id,
    serializedName: 'user_id',
  }) // Equivalent of class-transformer's `@Transform()`
  _user: User;

  @ManyToOne({
    serializer: (value) => value.id,
    serializedName: 'article_id',
  }) // Equivalent of class-transformer's `@Transform()`
  article: Article;

  constructor(id: string, content: string, user: User) {
    this._id = id;
    this._content = content;
    this._user = user;
  }

  get id(): string {
    return this._id;
  }

  get content(): string {
    return this._content;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  get deletedAt(): Date {
    return this._deletedAt;
  }

  get user(): User {
    return this._user;
  }
}
