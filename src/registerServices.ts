import { container } from "tsyringe";
import { Components } from "./shared/constants/Components";
import type { ILogger } from "./shared/services/logger/ILogger";
import Logger from "./shared/services/logger/Logger";
import "./modules/user/registerUserServices";
import "./modules/auth/registerAuthServices";
import { Config } from "./shared/services/config/Config";
import { EmailService } from "./shared/services/email/EmailService";
import type { IEmailService } from "./shared/services/email/IEmailService";
import type { IEmailProvider } from "./shared/services/email/providers/IEmailProvider";
import { NodeMailer } from "./shared/services/email/providers/NodeMailer";
// import { SendGrid } from "./shared/services/email/providers/SendGrid";
import { AxiosProvider } from "./shared/services/http/AxiosProvider";
import { Http } from "./shared/services/http/Http";
import type { IHttpClient } from "./shared/services/http/IHttpClient";

const config = container.resolve(Config);

container.register<ILogger>(Components.Logger, { useClass: Logger });

container.register<IHttpClient>(Components.Http, {
	useValue: new Http(new AxiosProvider()),
});

// container.register<IEmailProvider>(Components.EmailProvider, {
// 	useValue: new SendGrid(container.resolve<Http>(Components.Http), {
// 		baseUrl: String(config.get<string>("SENDGRID_BASE_URL")),
// 		apiKey: String(config.get<string>("SENDGRID_API_KEY")),
// 		fromEmail: String(config.get<string>("SENDGRID_FROM_EMAIL")),
// 		fromName: String(config.get<string>("SENDGRID_FROM_NAME")),
// 	}),
// });

container.register<IEmailProvider>(Components.EmailProvider, {
	useValue: new NodeMailer({
		driver: config.get<string>("NODEMAILER_DRIVER"),
		encryption: config.get<string>("NODEMAILER_ENCRYPTION"),
		host: config.get<string>("NODEMAILER_HOST"),
		name: config.get<string>("NODEMAILER_NAME"),
		password: config.get<string>("NODEMAILER_PASSWORD"),
		username: config.get<string>("NODEMAILER_USERNAME"),
		port: config.get<number>("NODEMAILER_PORT"),
	}),
});

container.register<IEmailService>(Components.EmailService, {
	useValue: new EmailService(
		container.resolve<IEmailProvider>(Components.EmailProvider),
	),
});
