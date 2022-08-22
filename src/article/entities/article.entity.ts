import { BigIntType, Entity, ManyToOne, PrimaryKey, Property, types } from '@mikro-orm/core';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Article {
  @PrimaryKey({ type: types.integer, unsigned: true, nullable: false })
  private id!: number;

  @Property({ type: types.string, length: 255 })
  private title!: string;

  @Property({ type: types.text, nullable: true })
  private content?: string;

  @Property({ type: types.tinyint, length: 1, default: false })
  private is_private!: boolean;

  @Property({ type: types.integer, unsigned: true, default: 0 })
  private view_count!: number;

  @Property({ hidden: true })
  private created_at: Date = new Date();

  @Property({ hidden: true, onUpdate: () => new Date() })
  private updated_at: Date = new Date();

  @Property({ hidden: true, nullable: true })
  private deleted_at?: Date;

  @ManyToOne({
    serializer: (value) => value.id,
    serializedName: 'user_id',
  }) // Equivalent of class-transformer's `@Transform()`
  user: User;

  constructor(partial: Partial<Article>) {
    Object.assign(this, partial);
  }

  get(): Article {
    return this;
  }
}
