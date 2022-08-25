import { BigIntType, Entity, ManyToOne, PrimaryKey, Property, types } from '@mikro-orm/core';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Article {
  @PrimaryKey({ type: types.integer, unsigned: true, nullable: false })
  private _id: number;

  @Property({ type: types.string, length: 255 })
  private _title!: string;

  @Property({ type: types.text, nullable: true })
  private _content?: string;

  @Property({ type: types.tinyint, length: 1, default: false })
  private _isPrivate!: boolean;

  @Property({ type: types.integer, unsigned: true, default: 0 })
  private _viewCount!: number;

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
  private _user: User;

  constructor(id: number, title: string, user: User, content = null, isPrivate = false, viewCount = 0) {
    this._id = id;
    this._title = title;
    this._user = user;
    this._content = content;
    this._isPrivate = isPrivate;
    this._viewCount = viewCount;
  }

  get id(): number {
    return this._id;
  }

  get title(): string {
    return this._title;
  }

  get content(): string {
    return this._content;
  }

  get isPrivate(): boolean {
    return this._isPrivate;
  }

  get viewCount(): number {
    return this._viewCount;
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
