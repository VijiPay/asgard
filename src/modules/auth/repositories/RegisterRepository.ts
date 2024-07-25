import type { Prisma, PrismaClient } from "@prisma/client";
import { injectable } from "tsyringe";
import type { IUser } from "../../user/interface/IUser";
// import type { ICreateUser } from "../interfaces/ICreateUser";
import type { IRegisterRepository } from "../interfaces/IRegisterRepository";

@injectable()
export class RegisterRepository implements IRegisterRepository {
	private connection: PrismaClient;
	constructor(dataSource: PrismaClient) {
		this.connection = dataSource;
	}

	async create(user: Prisma.UserCreateInput): Promise<IUser> {
		const createdUser = await this.connection.user.create({
			data: user,
			include: {
				profile: true,
				fraudScore: true,
			},
		});

		const { password, ...userWithoutPassword } = createdUser;
		return userWithoutPassword as IUser;
	}
}
