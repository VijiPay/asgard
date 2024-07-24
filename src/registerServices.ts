import { container } from "tsyringe";
import { Components } from "./shared/constants/Components";
import type { ILogger } from "./shared/services/logger/ILogger";
import Logger from "./shared/services/logger/Logger";
import "./modules/user/registerUserServices";
import "./modules/auth/registerAuthServices";

container.register<ILogger>(Components.Logger, { useClass: Logger });
