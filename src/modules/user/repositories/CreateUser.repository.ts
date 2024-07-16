import type {PrismaClient } from "@prisma/client";
import { injectable } from "tsyringe";
import type { ICreateUserRepository } from "../interface/ICreateUserRepository";
import type { IUserProfile } from "../interface/IUserProfile";
import type { ICreateUser } from "../interface/ICreateUser";

@injectable()
export class CreateUserRepository implements ICreateUserRepository {
	private connection;

	constructor(dataSource: PrismaClient) {
		this.connection = dataSource.user;
	}

	async create(user: ICreateUser): Promise<IUserProfile> {
		return this.connection.create({
			data: {
				...user,
				profile: {
					create: {
						role: "user",
						phoneVerified: false,
						emailVerified: false,
					},
				},
				fraudScores: {
					create: {
						score: 0,
						result: "No Record",
					},
				},
			},
			include: {
				profile: true,
				fraudScores: true,
			},
		});
	}
}
