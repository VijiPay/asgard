import { container } from "tsyringe";
import { dataSource } from "./database/datasource";
import type { ICreateUserRepository } from "./modules/user/interface/ICreateUserRepository";
import { CreateUserRepository } from "./modules/user/repositories/CreateUser.repository";
import { Components } from "./shared/constants/Components";
import type { ILogger } from "./shared/services/logger/ILogger";

export const registerRepositories = async (logger?: ILogger) => {
  await dataSource
    .initialize()
    .catch(() => logger?.error("db connection failed"));

  logger?.info("db connection success");

  container.register<ICreateUserRepository>(Components.CreateUserRepository, {
    useValue: new CreateUserRepository(dataSource),
  });

  return dataSource;
};
