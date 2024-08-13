import type { NotificationParams, NotificationType } from "./NotificationTypes";

export interface INotificationService {
	send(data: NotificationType, params: NotificationParams): void;
}
