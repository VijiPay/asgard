import type { IEmailData } from "../IEmailService";

export interface IEmailProvider {
send(data: IEmailData): Promise<void>;
}
