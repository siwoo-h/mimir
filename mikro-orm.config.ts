import { Options } from '@mikro-orm/core';
import { Article } from '@src/article/entities/article.entity';
import { Comment } from '@src/comment/entities/comment.entity';
import config from '@src/common/config';
import { User } from '@src/user/entities/user.entity';

const databaseConfig = config().database;

const options: Options = {
  entities: [User, Article, Comment],
  type: 'mysql',
  dbName: databaseConfig.database,
  debug: true,
  port: databaseConfig.port,
  user: databaseConfig.username,
  password: databaseConfig.password,
  seeder: {
    path: `${__dirname}/seeders`, // path to the folder with seeders
    pathTs: undefined, // path to the folder with TS seeders (if used, we should put path to compiled files in `path`)
    defaultSeeder: 'DatabaseSeeder', // default seeder class name
    glob: '!(*.d).{js,ts}', // how to match seeder files (all .js and .ts files, but not .d.ts)
    emit: 'ts', // seeder generation mode
    fileName: (className: string) => className, // seeder file naming convention
  },
};

export default options;
