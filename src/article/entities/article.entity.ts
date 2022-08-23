import { BigIntType, Entity, ManyToOne, PrimaryKey, Property, types } from '@mikro-orm/core';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Article {
  @PrimaryKey({ type: types.integer, unsigned: true, nullable: false })
  private id: number;

  @Property({ type: types.string, length: 255 })
  private title!: string;

  @Property({ type: types.text, nullable: true })
  private content?: string;

  @Property({ type: types.tinyint, length: 1, default: false })
  private isPrivate!: boolean;

  @Property({ type: types.integer, unsigned: true, default: 0 })
  private viewCount!: number;

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

  constructor({ title, isPrivate = false, content = null }) {
    this.title = title;
    this.isPrivate = isPrivate;
    this.content = content;
  }

  getId(): number {
    return this.id;
  }

  getTitle(): string {
    return this.title;
  }

  getContent(): string {
    return this.content;
  }

  getIsPrivate(): boolean {
    return this.isPrivate;
  }

  getViewCount(): number {
    return this.viewCount;
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
