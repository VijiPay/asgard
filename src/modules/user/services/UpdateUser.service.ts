import { inject, injectable } from "tsyringe";
import { UserComponents } from "../constants/UserComponents";
import type { IUpdateUserRepository } from "../interface/IUpdateUserRepository";
import type { IUpdateUserService } from "../interface/IUpdateUserService";

@injectable()
export class UpdateUserService implements IUpdateUserService {
	constructor(
		@inject(UserComponents.UpdateUserRepository)
		private user: IUpdateUserRepository,
	) {}

	disable(id: number): Promise<void> {
		return this.user.disable(id);
	}
}
