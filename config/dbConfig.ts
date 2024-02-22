import dotenv from "dotenv";
import { PoolConfig } from "pg";
dotenv.config();

const {
  DB_USERNAME,
  DB_PASSWORD,
  DB_HOST,
  DB_DATABASE,
  DB_PORT
} = process.env;

export const dbConfig: PoolConfig = {
  user: DB_USERNAME,
  host: DB_HOST,
  database: DB_DATABASE,
  password: DB_PASSWORD
};


// export const dbConfig = {
//   user: DB_USERNAME_COPS,
//   password: DB_PASSWORD_COPS,
//   connectString: DB_CONNECTION_STRING_COPS,
//   connectionTimeout: DB_CONNECTION_TIMEOUT_COPS,
//   poolMin: 1,
//   poolMax: 10,
//   poolIncrement: 10,
//   poolPingInterval: 60,
//   poolTimeout: 600000,
//   queueTimeout: 600000,
//   queueRequests: 100,
//   queueMax: 600000,
// };