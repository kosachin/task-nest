import { config } from 'dotenv';
import { resolve } from 'path';
import { DataSource } from 'typeorm';
import Entities from '../entities';

config({ path: resolve(__dirname, '../../.env') });

const {
  DB_HOST = 'localhost',
  DB_PORT = '5432',
  DB_USERNAME = 'postgres',
  DB_PASSWORD = 'postgres',
  DB_NAME = 'myapp',
} = process.env;

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: DB_HOST,
  port: parseInt(DB_PORT, 10),
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_NAME,
  entities: Entities,
  migrations: ['apps/task-nest/src/migrations/*.ts'],
  synchronize: false,
  logging: false,
});
