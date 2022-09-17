import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { Article } from '@src/article/entities/article.entity';
import { User } from '@src/user/entities/user.entity';

export class DatabaseSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    const user = em.create(User, {
      email: 'user1@test.co.kr',
      nickname: 'user1',
      password: 'user1pw!',
    });

    const article = em.create(Article, {
      title: 'article',
      isPrivate: true,
      viewCount: 0,
    });
  }
}
