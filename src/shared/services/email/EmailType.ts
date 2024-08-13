import type { Options } from "nodemailer/lib/mailer";
import type { EmailTemplateOption } from "./IEmail";

export type EmailMessage = Options &
	Partial<Pick<EmailTemplateOption, "data" | "templatePath">>;
