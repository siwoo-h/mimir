import * as crypto from 'crypto';
import { UniqueConstraintViolationException } from '@mikro-orm/core';
import { HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { CreateUserDto } from '@src/auth/dto/in/create-user.dto';
import { User } from '@src/user/entities/user.entity';
import { AuthConfig } from '@src/common/config';
import { UserService } from '@src/user/user.service';

@Injectable()
export class AuthService {
  private authConfig: AuthConfig;
  constructor(private readonly configService: ConfigService, private readonly userService: UserService, private jwtService: JwtService) {
    this.authConfig = this.configService.get<AuthConfig>('auth');
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const { email, nickname, password } = createUserDto;
      const isUsedEmail = await this.isEmailUsed(email);
      if (isUsedEmail) {
        throw new HttpException({ message: 'Email already registered' }, 400);
      }
      const hashedPassword = await this.hashString(password);
      const user = await this.userService.create({ email, nickname, password: hashedPassword });
      return user;
    } catch (error) {
      if (error instanceof UniqueConstraintViolationException) {
        throw new HttpException({ message: error.message }, 400);
      }
      throw error;
    }
  }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    const hashedPassword = await this.hashString(pass);
    if (user && user.getPassword() === hashedPassword) {
      return user;
    }
    return null;
  }

  async login(user: User) {
    const { id, email, nickname } = user;
    const payload = { id, email, nickname };
    const accessToken = this.jwtService.sign(payload, { secret: this.authConfig.jwtSecret, expiresIn: this.authConfig.jwtExpiresIn });
    return {
      accessToken,
    };
  }

  private async isEmailUsed(email: string): Promise<Boolean> {
    const user = await this.userService.findByEmail(email);
    return !!user;
  }

  private hashString(target: string): Promise<string> {
    return new Promise((resolve, reject) => {
      crypto.pbkdf2(target, this.authConfig.passwordSalt, 140137, 64, 'sha512', (error: Error, derivedKey: Buffer) => {
        if (error) {
          return reject(error);
        }
        resolve(derivedKey.toString('base64'));
      });
    });
  }
}
