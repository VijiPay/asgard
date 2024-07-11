import { inject, injectable } from "tsyringe";
import { Components } from "../../../shared/constants/Components";
import type { IGetUserRepository } from "../interface/IGetUserRepository";
import type { IUserProfile } from "../interface/IUserProfile";

@injectable()
export class GetUserUsecase {
	constructor(
		@inject(Components.GetUserRepository) private getUser: IGetUserRepository,
	) {}

	async find(
		id?: number,
		email?: string,
	): Promise<IUserProfile | undefined | null> {
		if (id && email) {
			throw new Error("Not allowed to provide both ID and EMAIL");
		}
		if (id) {
			return this.getUser.findById(id);
		}
		if (email) {
			return this.getUser.findByEmail(email);
		}
		return null;
	}

	async findById(id: number): Promise<IUserProfile | null> {
		return this.getUser.findById(id);
	}

	async findByEmail(email: string): Promise<IUserProfile | null> {
		return this.getUser.findByEmail(email);
	}

	async get(): Promise<IUserProfile[]> {
		return this.getUser.findAll();
	}
}
