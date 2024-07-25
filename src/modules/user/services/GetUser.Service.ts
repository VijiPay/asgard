import { inject, injectable } from "tsyringe";
import { UserComponents } from "../constants/UserComponents";
import type { IGetUserRepository } from "../interface/IGetUserRepository";
import type { IGetUserService } from "../interface/IGetUserService";
import type { IUserProfile } from "../interface/IUserProfile";

@injectable()
export class GetUserService implements IGetUserService {
	constructor(
		@inject(UserComponents.GetUserRepository)
		private getUser: IGetUserRepository,
	) {}

	find(id?: number, email?: string): Promise<IUserProfile | undefined | null> {
		if (id && email) {
			throw new Error("BothIdAndEmail.notAllowed");
		}
		if (id) {
			this.getUser.findById(id);
		}
		if (email) {
			this.getUser.findByEmail(email);
		}
		return Promise.resolve(null);
	}

	async findById(id: number): Promise<IUserProfile | null> {
		return (await this.getUser.findById(id)) as unknown as IUserProfile;
	}

	async findByEmail(email: string): Promise<IUserProfile | null> {
		return this.getUser.findByEmail(email) as unknown as IUserProfile;
	}

	async all(): Promise<IUserProfile[]> {
		return this.getUser.findAll() as unknown as IUserProfile[];
	}
}
