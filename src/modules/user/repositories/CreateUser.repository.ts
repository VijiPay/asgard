import type { Prisma, PrismaClient } from "@prisma/client";
import { injectable } from "tsyringe";
import type { ICreateUser } from "../interface/ICreateUser";
import type { ICreateUserRepository } from "../interface/ICreateUserRepository";
import type { IUserProfile } from "../interface/IUserProfile";

@injectable()
export class CreateUserRepository implements ICreateUserRepository {
	private connection;

	constructor(dataSource: PrismaClient) {
		this.connection = dataSource.user;
	}

	async create(user: ICreateUser): Promise<IUserProfile> {
		return this.connection.create({ data: user as Prisma.UserCreateInput });
	}
}
