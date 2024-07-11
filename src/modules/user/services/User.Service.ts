import { inject, injectable } from "tsyringe";
import { Components } from "../../../shared/constants/Components";
import type { IUserProfile } from "../interface/IUserProfile";
import type { IUserService } from "../interface/IUserService";
import type { GetUserUsecase } from "../use-cases/GetUser.usecase";

@injectable()
export class UserService implements IUserService {
	constructor(
		@inject(Components.GetUserUseCase) private user: GetUserUsecase,
	) {}

	async find(
		id?: number,
		email?: string,
	): Promise<IUserProfile | undefined | null> {
		return this.user.find(id, email);
	}

	async findByEmail(email: string): Promise<IUserProfile | null> {
		return this.user.findByEmail(email);
	}
	async findById(id: number): Promise<IUserProfile | null> {
		return this.user.findById(id);
	}
	async all(): Promise<IUserProfile[]> {
		return this.user.get();
	}
}
