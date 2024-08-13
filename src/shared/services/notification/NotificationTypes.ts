import type { EmailTemplateOption } from "../email/IEmail";

export type NotificationType = {
	email?: string | null;
	phone?: string | null;
};

export type NotificationParams = Pick<
	EmailTemplateOption,
	"data" | "templatePath"
>;
