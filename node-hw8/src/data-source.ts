import { DataSource } from "typeorm";
import dotenv from "dotenv";
dotenv.config();


export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: true,
  entities: ["src/entity/*.ts"],
  subscribers: [],
  migrations: [],
});