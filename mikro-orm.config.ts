import { Options } from '@mikro-orm/core';
import { Article } from './src/article/entities/article.entity';
import { Comment } from './src/comment/entities/comment.entity';
import { User } from './src/user/entities/user.entity';

const options: Options = {
  entities: [User, Article, Comment],
  type: 'mysql',
  dbName: 'dev',
  debug: true,
  port: 3306,
  user: 'mimir',
  password: 'mimirpw',
  seeder: {
    path: './seeders', // path to the folder with seeders
    pathTs: undefined, // path to the folder with TS seeders (if used, we should put path to compiled files in `path`)
    defaultSeeder: 'DatabaseSeeder', // default seeder class name
    glob: '!(*.d).{js,ts}', // how to match seeder files (all .js and .ts files, but not .d.ts)
    emit: 'ts', // seeder generation mode
    fileName: (className: string) => className, // seeder file naming convention
  },
};

export default options;
