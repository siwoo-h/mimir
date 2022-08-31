import { Entity, PrimaryKey, Property, types } from '@mikro-orm/core';

@Entity()
export class User {
  @PrimaryKey({ type: types.uuid, nullable: false })
  private id: string;

  @Property({ type: types.string, length: 255, unique: true })
  private email!: string;

  @Property({ type: types.string, length: 255, unique: true })
  private nickname!: string;

  @Property({ type: types.string, length: 255 })
  private password!: string;

  @Property({ hidden: true })
  private registeredAt: Date = new Date();

  @Property({ hidden: true, onUpdate: () => new Date() })
  private updatedAt: Date = new Date();

  @Property({ hidden: true, nullable: true })
  private disabledAt?: Date;

  constructor(email: string, nickname: string, password: string) {
    this.email = email;
    this.nickname = nickname;
    this.password = password;
  }

  getId(): string {
    return this.id;
  }

  getEmail(): string {
    return this.email;
  }

  getNickname(): string {
    return this.nickname;
  }

  getPassword(): string {
    return this.password;
  }

  getRegisteredAt(): Date {
    return this.registeredAt;
  }

  getUpdatedAt(): Date {
    return this.updatedAt;
  }

  getDisabledAt(): Date {
    return this.disabledAt;
  }
}
