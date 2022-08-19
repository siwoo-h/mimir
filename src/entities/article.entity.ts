import {
  BigIntType,
  Entity,
  ManyToOne,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { User } from './user.entity';

@Entity()
export class Article {
  @PrimaryKey({ type: BigIntType })
  id: string;

  @Property()
  title: string;

  @Property()
  content: string;

  @Property({ default: false })
  is_private: boolean;

  @Property({ default: 0 })
  view_count: number;

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
}
