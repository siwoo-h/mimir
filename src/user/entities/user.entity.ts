import { v4 } from 'uuid';
import { Entity, PrimaryKey, Property, types } from '@mikro-orm/core';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User {
  @ApiProperty({ description: 'uuid' })
  @PrimaryKey({ type: types.uuid, nullable: false })
  private id: string = v4();

  @ApiProperty({ description: 'email' })
  @Property({ type: types.string, length: 255, unique: true })
  private email!: string;

  @ApiProperty({ description: 'nickname' })
  @Property({ type: types.string, length: 255, unique: true })
  private nickname!: string;

  @ApiProperty({ description: 'password' })
  @Property({ hidden: true, type: types.string, length: 255 })
  private password!: string;

  @ApiProperty({ description: 'registeredAt' })
  @Property({ hidden: true })
  private registeredAt: Date = new Date();

  @ApiProperty({ description: 'updatedAt(hidden)' })
  @Property({ hidden: true, onUpdate: () => new Date() })
  private updatedAt: Date = new Date();

  @ApiProperty({ description: 'disabledAt(hidden)' })
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
