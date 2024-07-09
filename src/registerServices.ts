import { container } from "tsyringe";
import { AuthService } from "./modules/user/services/Auth.service";
import { CreateUserUsecase } from "./modules/user/use-cases/CreateUser.usecase";
import { DecryptPasswordUsecase } from "./modules/user/use-cases/DecryptPassword.usecase";
import { EncryptPasswordUsecase } from "./modules/user/use-cases/GetUser.usecase";
import { Components } from "./shared/constants/Components";
import type { ILogger } from "./shared/services/logger/ILogger";
import Logger from "./shared/services/logger/Logger";

container.register<ILogger>(Components.Logger, { useClass: Logger });
container.register(Components.CreateUserUsecase, {
  useClass: CreateUserUsecase,
});
container.register<EncryptPasswordUsecase>(Components.EncryptPasswordUsecase, {
  useClass: EncryptPasswordUsecase,
});
container.register<DecryptPasswordUsecase>(Components.DecryptPasswordUsecase, {
  useClass: DecryptPasswordUsecase,
});
container.register<AuthService>(Components.AuthService, {
  useClass: AuthService,
});
