import { inject, singleton } from "tsyringe";
import { UserComponents } from "../constants/UserComponents";
import type { UpdateUserDTO } from "../dtos/UpdateUserDTO";
import type { IUpdateUserRepository } from "../interface/IUpdateUserRepository";
import type { IUpdateUserService } from "../interface/IUpdateUserService";
import type { IUserProfile } from "../interface/IUserProfile";

@singleton()
export class UpdateUserService implements IUpdateUserService {
	constructor(
		@inject(UserComponents.UpdateUserRepository)
		private user: IUpdateUserRepository,
	) {}

	disable(id: number): Promise<void> {
		return this.user.disable(id);
	}

	update(userId: number, payload: UpdateUserDTO): Promise<void> {
		const update: Partial<IUserProfile> = {
			id: userId,
			email: payload.email,
			profile: payload.profile
				? {
						address: payload.profile.address || null,
						phoneNumber: payload.profile.phoneNumber || null,
					}
				: null,
		};
		return this.user.update(update);
	}

}
