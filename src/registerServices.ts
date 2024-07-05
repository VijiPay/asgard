import { container } from "tsyringe";
import { CreateUserUsecase } from "./modules/user/use-cases/CreateUser.usecase";
import { Components } from "./shared/constants/Components";
import type { ILogger } from "./shared/services/logger/ILogger";
import Logger from "./shared/services/logger/Logger";

container.register<ILogger>(Components.Logger, { useClass: Logger });
container.register(Components.CreateUserUsecase, {
  useClass: CreateUserUsecase,
});
