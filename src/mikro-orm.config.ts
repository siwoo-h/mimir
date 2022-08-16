import { User } from './entities/user.entity';

export default {
  entities: [User], // no need for `entitiesTs` this way
  dbName: 'mimir',
  type: 'mysql', // one of `mongo` | `mysql` | `mariadb` | `postgresql` | `sqlite`
};
