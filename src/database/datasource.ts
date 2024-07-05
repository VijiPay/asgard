import { container } from "tsyringe";
import { DataSource, type DataSourceOptions } from "typeorm";
import Config from "../shared/services/config/Config";

const config = container.resolve(Config);
const dataSourceOptions: DataSourceOptions = {
  type: "postgres",
  host: config.get<string>("DB_HOST"),
  port: config.get<number>("DB_PORT"),
  username: config.get<string>("DB_USER"),
  password: config.get<string>("DB_PASSWORD"),
  database: config.get<string>("DB_NAME"),
  entities: ["../**/*.entity.{ts,js}"],
  migrations: ["src/database/migrations/*.{ts,js}"],
  synchronize: config.get<string>("ENV") === "testing",
  logging: Boolean(config.get<string>("DB_LOGGING")),
  migrationsTableName: "migration_entries",
};

export const dataSource = new DataSource(dataSourceOptions);
