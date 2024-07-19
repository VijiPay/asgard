import type { PrismaClient } from "@prisma/client";
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
		return this.connection.create({
			data: {
				...user,
				type: "INDIVIDUAL",
				profile: {
					create: {
						role: "user",
						tradeName: `${user.firstName} ${user.lastName}`,
						phoneVerified: false,
						emailVerified: false,
						tosAcceptance: {
							accepted: true,
							acceptedOn: Date.now(),
						},
					},
				},
				fraudScore: {
					create: {
						score: 0,
						result: "No Record",
					},
				},
			},
			include: {
				profile: true,
				fraudScore: true,
			},
		});
	}
}
