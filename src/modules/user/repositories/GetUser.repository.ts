import type { PrismaClient } from "@prisma/client";
import { singleton } from "tsyringe";
import type { IGetUserRepository } from "../interface/IGetUserRepository";
import type { IUser } from "../interface/IUser";

@singleton()
export class GetUserRepository implements IGetUserRepository {
	private connection;

	constructor(dataSource: PrismaClient) {
		this.connection = dataSource.user;
	}

	async findByEmail(email: string): Promise<IUser | null> {
		const user = await this.connection.findUnique({
			where: { email },
			include: {
				profile: true,
				initiatedTransactions: {
					select: {
						id: true,
					},
				},
				receivedTransactions: {
					select: {
						id: true,
					},
				},
				fraudScore: true,
				payouts: true,
				paymentMethods: true,
			},
		});
		if (!user) return null;

		return user;
	}

	async findById(id: number): Promise<IUser | null> {
		const user = await this.connection.findUnique({
			where: { id },
			include: {
				profile: true,
				initiatedTransactions: {
					select: {
						id: true,
					},
				},
				receivedTransactions: {
					select: {
						id: true,
					},
				},
				fraudScore: true,
				payouts: true,
				paymentMethods: true,
			},
		});
		if (!user) return null;
		return user;
	}

	async findAll(): Promise<IUser[]> {
		const users = await this.connection.findMany({
			include: {
				profile: true,
				initiatedTransactions: {
					select: {
						id: true,
					},
				},
				receivedTransactions: {
					select: {
						id: true,
					},
				},
				fraudScore: true,
				payouts: true,
				paymentMethods: true,
			},
		});

		return users;
	}
}
