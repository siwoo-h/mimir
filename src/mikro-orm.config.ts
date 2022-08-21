import { Options } from '@mikro-orm/core';
import { Article } from './article/entities/article.entity';
import { Comment } from './comment/entities/comment.entity';
import { User } from './user/entities/user.entity';

const options: Options = {
  entities: [User, Article, Comment],
  type: 'mysql',
  dbName: 'dev',
  debug: true,
  port: 3306,
  user: 'mimir',
  password: 'mimirpw',
};

export default options;
