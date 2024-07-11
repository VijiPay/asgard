import type { PrismaClient } from "@prisma/client";
import { singleton } from "tsyringe";
import type { IGetUserRepository } from "../interface/IGetUserRepository";
import type { IUserProfile } from "../interface/IUserProfile";

@singleton()
export class GetUserRepository implements IGetUserRepository {
	private connection;

	constructor(dataSource: PrismaClient) {
		this.connection = dataSource.user;
	}

	async findByEmail(email: string): Promise<IUserProfile | null> {
		const user = await this.connection.findUnique({ where: { email } });
		return user as IUserProfile;
	}

	async findById(id: number): Promise<IUserProfile | null> {
		const user = await this.connection.findUnique({ where: { id } });
		return user as IUserProfile;
	}

	async findAll(): Promise<IUserProfile[]> {
		const users = await this.connection.findMany();
		return users as IUserProfile[];
	}
}
