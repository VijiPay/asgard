import httpStatus from "http-status";
import { inject, singleton } from "tsyringe";
import { Components } from "../../../shared/constants/Components";
import { EmailTemplatePath } from "../../../shared/enums/EmailTemplatePath";
import { CustomException } from "../../../shared/exceptions/CustomException";
import type { INotificationService } from "../../../shared/services/notification/INotificationService";
import { encryptPassword } from "../../../shared/utils/jwt";
import { UserComponents } from "../../user/constants/UserComponents";
import type { IGetUserRepository } from "../../user/interface/IGetUserRepository";
import { AuthComponents } from "../constants/AuthComponents";
import type { CreateUserDTO } from "../dtos/CreateUserDTO";
import type { ICreateUser } from "../interfaces/ICreateUser";
import type { IRegisterRepository } from "../interfaces/IRegisterRepository";
import type { IRegisterService } from "../interfaces/IRegisterService";

@singleton()
export class RegisterService implements IRegisterService {
	constructor(
		@inject(AuthComponents.RegisterRepository)
		private registerRepository: IRegisterRepository,
		@inject(UserComponents.GetUserRepository)
		private userRepository: IGetUserRepository,
		@inject(Components.NotificationService)
		private notification: INotificationService,
	) {}

	async register(
		data: CreateUserDTO,
	): Promise<{ name: string; email: string }> {
		const userExists = await this.userRepository.findByEmail(data.email);
		if (userExists) {
			throw new CustomException("user.already.exists", httpStatus.FORBIDDEN);
		}
		const oauth = this.oauth(data.authId);
		const encryptedPassword = await encryptPassword(data.password);
		const userData: ICreateUser = {
			...data,
			password: encryptedPassword,
			profile: {
				create: {
					tradeName: `${data.firstName} ${data.lastName}`,
					googleId: oauth?.type === "google" ? oauth.id : null,
					facebookId: oauth?.type === "facebook" ? oauth.id : null,
				},
			},
		};

		const user = await this.registerRepository.create(userData);
		this.notification.send(
			{ email: data.email },
			{ templatePath: EmailTemplatePath.REGISTRATION },
		);

		return { name: user.firstName, email: user.email };
	}

	oauth(input: string): { type: string; id: string } | null {
		let type: string;
		if (input.startsWith("google")) {
			type = "google";
		} else if (input.startsWith("facebook")) {
			type = "facebook";
		} else {
			return null;
		}
		const id = input.replace(`${type}$`, "");

		return { type, id };
	}
}
