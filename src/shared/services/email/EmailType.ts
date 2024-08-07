import type { Options } from "nodemailer/lib/mailer";
import type { IEmailData } from "./IEmailService";

export type EmailMessage = Options &
	Partial<Pick<IEmailData, "data" | "templatePath">>;
