import { container } from "tsyringe";
import { Components } from "./shared/constants/Components";
import type { ILogger } from "./shared/services/logger/ILogger";
import Logger from "./shared/services/logger/Logger";
import "./modules/user/registerUserServices";
import { AuthComponents } from "./modules/auth/constants/AuthComponents";
import { AuthService } from "./modules/auth/services/Login.service";

container.register<ILogger>(Components.Logger, { useClass: Logger });
container.register<AuthService>(AuthComponents.AuthService, {
	useClass: AuthService,
});
