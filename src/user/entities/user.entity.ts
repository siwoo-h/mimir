import { BigIntType, Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class User {
  @PrimaryKey({ type: BigIntType })
  private id!: string;

  @Property({ unique: true })
  private email!: string;

  @Property({ unique: true })
  private nickname!: string;

  @Property()
  private password!: string;

  @Property({ hidden: true })
  private registered_at: Date = new Date();

  @Property({ hidden: true, onUpdate: () => new Date() })
  private updated_at: Date = new Date();

  @Property({ hidden: true })
  private disabled_at?: Date;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }

  get(): User {
    return this;
  }
}
