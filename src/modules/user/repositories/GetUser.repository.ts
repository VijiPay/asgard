import type { PrismaClient } from "@prisma/client";
import { singleton } from "tsyringe";
import type { IGetUserRepository } from "../interface/IGetUserRepository";
import type { IUser } from "../interface/IUser";

@singleton()
export class GetUserRepository implements IGetUserRepository {
	private connection;
	private profile;

	constructor(dataSource: PrismaClient) {
		this.connection = dataSource.user;
		this.profile = dataSource.profile;
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

	async findByGoogleId(googleId: string): Promise<IUser | null> {
		const profileWithUser = await this.profile.findFirst({
			where: { googleId },
			include: {
				user: true,
			},
		});

		if (!profileWithUser || !profileWithUser.user) {
			return null;
		}

		return profileWithUser.user as IUser;
	}

	async findByFacebookId(facebookId: string): Promise<IUser | null> {
		const profileWithUser = await this.profile.findFirst({
			where: { facebookId },
			include: {
				user: true,
			},
		});

		if (!profileWithUser || !profileWithUser.user) {
			return null;
		}

		return profileWithUser.user as IUser;
	}
}
