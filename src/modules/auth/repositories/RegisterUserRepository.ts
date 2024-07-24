import type { PrismaClient } from "@prisma/client";
import { injectable } from "tsyringe";
import type { IUserProfile } from "../../user/interface/IUserProfile.js";
import type { ICreateUser } from "../interfaces/ICreateUser.js";
import type { IRegisterUserRepository } from "../interfaces/IRegisterUserRepository";

@injectable()
export class RegisterUserRepository implements IRegisterUserRepository {
	private connection: PrismaClient;
	constructor(dataSource: PrismaClient) {
		this.connection = dataSource;
	}

	async create(user: ICreateUser): Promise<IUserProfile> {
		return await this.connection.user.create({
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
