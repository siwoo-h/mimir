import { BigIntType, Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class User {
  @PrimaryKey({ type: BigIntType })
  id: string;

  @Property({ persist: false, unique: true }) // Similar to class-transformer's `@Expose()`. Will only exist in memory, and will be serialized.
  email: string;

  @Property({ persist: false, unique: true }) // Similar to class-transformer's `@Expose()`. Will only exist in memory, and will be serialized.
  nickname: string;

  @Property({ persist: false }) // Similar to class-transformer's `@Expose()`. Will only exist in memory, and will be serialized.
  password: string;

  @Property({ hidden: true }) // Equivalent of class-transformer's `@Exclude`
  registered_at = Date.now();

  @Property({ hidden: true }) // Equivalent of class-transformer's `@Exclude`
  updated_at?: Date;

  @Property({ hidden: true }) // Equivalent of class-transformer's `@Exclude`
  disabled_at?: Date;
}
