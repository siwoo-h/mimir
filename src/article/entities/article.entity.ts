import {
  BigIntType,
  Entity,
  ManyToOne,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { User } from '../../entities/user.entity';

@Entity()
export class Article {
  @PrimaryKey({ type: BigIntType })
  private id!: string;

  @Property()
  private title!: string;

  @Property()
  private content!: string;

  @Property({ default: false })
  private is_private!: boolean;

  @Property({ default: 0 })
  private view_count!: number;

  @Property({ hidden: true })
  private created_at: Date = new Date();

  @Property({ hidden: true, onUpdate: () => new Date() })
  private updated_at: Date = new Date();

  @Property({ hidden: true, default: null })
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
