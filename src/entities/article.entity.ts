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

  @Property({ persist: false })
  title: string;

  @Property({ persist: false })
  content: string;

  @Property({ persist: false, default: false })
  is_private: boolean;

  @Property({ persist: false, default: 0 })
  view_count: number;

  @Property({ hidden: true })
  created_at = Date.now();

  @Property({ hidden: true })
  updated_at?: Date;

  @Property({ hidden: true })
  disabled_at?: Date;

  @ManyToOne({
    serializer: (value) => value.id,
    serializedName: 'user_id',
  }) // Equivalent of class-transformer's `@Transform()`
  user: User;
}
