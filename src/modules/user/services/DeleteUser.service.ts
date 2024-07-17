import { inject, injectable } from "tsyringe";
import { UserComponents } from "../constants/UserComponents";

import type { IDeleteUserRepository } from "../interface/IDeleteUserRepository";
import type { IDeleteUserService } from "../interface/IDeleteUserService";

@injectable()
export class DeleteUserService implements IDeleteUserService {
	constructor(
		@inject(UserComponents.DeleteUserRepository)
		private user: IDeleteUserRepository,
	) {}
	delete(id: number): Promise<void> {
		return this.user.delete(id);
	}
	deleteAll(): Promise<void> {
		return this.user.deleteAll();
	}
}
