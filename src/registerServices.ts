import { container } from "tsyringe";
import { Components } from "./shared/constants/Components";
import type { ILogger } from "./shared/services/logger/ILogger";
import Logger from "./shared/services/logger/Logger";
import "./modules/user/registerUserServices";
import "./modules/auth/registerAuthServices";
import { EmailService } from "./shared/services/email/EmailService";
import type { IEmailService } from "./shared/services/email/IEmailService";

container.register<ILogger>(Components.Logger, { useClass: Logger });

container.register<IEmailService>(Components.Email, {
	useClass: EmailService,
});
