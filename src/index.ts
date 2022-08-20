import { MikroORM } from '@mikro-orm/core';
import type { MySqlDriver } from '@mikro-orm/mysql';

const main = async () => {
  const orm = await MikroORM.init<MySqlDriver>();
  const em = orm.em.fork();
};

main()
  .catch((error) => {
    console.error(error);
  })
  .finally(() => {
    process.exit();
  });
