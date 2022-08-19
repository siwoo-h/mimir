import { BigIntType, Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class User {
  @PrimaryKey({ type: BigIntType })
  id: string;

  @Property({ unique: true })
  email: string;

  @Property({ unique: true })
  nickname: string;

  @Property()
  password: string;

  @Property({ hidden: true })
  registered_at = Date.now();

  @Property({ hidden: true })
  updated_at?: Date;

  @Property({ hidden: true })
  disabled_at?: Date;
}
