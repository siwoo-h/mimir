import { Entity, PrimaryKey, Property, types } from '@mikro-orm/core';

@Entity()
export class User {
  @PrimaryKey({ type: types.uuid, nullable: false })
  private _id: string;

  @Property({ type: types.string, length: 255, unique: true })
  private _email!: string;

  @Property({ type: types.string, length: 255, unique: true })
  private _nickname!: string;

  @Property({ type: types.string, length: 255 })
  private _password!: string;

  @Property({ hidden: true })
  private _registeredAt: Date = new Date();

  @Property({ hidden: true, onUpdate: () => new Date() })
  private _updatedAt: Date = new Date();

  @Property({ hidden: true, nullable: true })
  private _disabledAt?: Date;

  constructor(id: string, email: string, nickname: string, password: string) {
    this._id = id;
    this._email = email;
    this._nickname = nickname;
    this._password = password;
  }

  get id(): string {
    return this._id;
  }

  get email(): string {
    return this._email;
  }

  get nickname(): string {
    return this._nickname;
  }

  get password(): string {
    return this._password;
  }

  get registeredAt(): Date {
    return this._registeredAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  get disabledAt(): Date {
    return this._disabledAt;
  }
}
