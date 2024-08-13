import { inject, injectable } from "tsyringe";
import { Components } from "../../constants/Components";
import type { IEmail } from "../email/IEmail";
import type { INotificationService } from "./INotificationService";
import type { NotificationParams, NotificationType } from "./NotificationTypes";

@injectable()
export class NotificationService implements INotificationService {
	constructor(@inject(Components.Email) private emailService: IEmail) {}
	send({ email }: NotificationType, params: NotificationParams): void {
		if (email) {
			this.emailService.send({
				to: [email],
				...params,
			});
		}
	}
}
