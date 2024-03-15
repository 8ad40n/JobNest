import { User } from 'src/entities/user.entity';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

const config: PostgresConnectionOptions = {
  type: 'postgres',
  database: 'JobNest',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '1234',
  entities: [User],
  synchronize: true,
};

export default config;