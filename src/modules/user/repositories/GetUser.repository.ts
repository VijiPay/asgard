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
		const user = await this.connection.findUnique({
			where: { email },
			include: {
				profile: true,
				transactions: {
					select: {
						id: true,
					},
				},
				fraudScores: true,
				payouts: true,
				paymentMethod: true,
			},
		});
		if (!user) return null;

		const userProfile: IUserProfile = {
			id: user.id,
			firstName: user.firstName,
			lastName: user.lastName,
			email: user.email,
			type: user.type,
			status: user.status,
			countryCode: user.countryCode,
			profile: user.profile
				? {
						role: user.profile.role,
						nickname: user.profile.nickname,
						phoneNumber: user.profile.phoneNumber,
						address: user.profile.address,
						lastLogin: user.profile.lastLogin,
						phoneVerified: user.profile.phoneVerified,
						emailVerified: user.profile.emailVerified,
					}
				: null,
			paymentMethod: user.paymentMethod.map((pm) => ({
				id: pm.id,
				name: pm.name,
				paymentId: pm.paymentId,
				institution: pm.institution,
			})),
			transactionsCount: user.transactions.length,
			fraudScores: user.fraudScores.map((fraudScore) => ({
				score: fraudScore.score,
				result: fraudScore.result,
			})),
		};

		return userProfile;
	}

	async findById(id: number): Promise<IUserProfile | null> {
		const user = await this.connection.findUnique({
			where: { id },
			include: {
				profile: true,
				transactions: {
					select: {
						id: true,
					},
				},
				fraudScores: true,
				payouts: true,
				paymentMethod: true,
			},
		});
		if (!user) return null;

		const userProfile: IUserProfile = {
			id: user.id,
			firstName: user.firstName,
			lastName: user.lastName,
			email: user.email,
			type: user.type,
			status: user.status,
			countryCode: user.countryCode,
			profile: user.profile
				? {
						role: user.profile.role,
						nickname: user.profile.nickname,
						phoneNumber: user.profile.phoneNumber,
						address: user.profile.address,
						lastLogin: user.profile.lastLogin,
						phoneVerified: user.profile.phoneVerified,
						emailVerified: user.profile.emailVerified,
					}
				: null,
			paymentMethod: user.paymentMethod.map((pm) => ({
				id: pm.id,
				name: pm.name,
				paymentId: pm.paymentId,
				institution: pm.institution,
			})),
			transactionsCount: user.transactions.length,
			fraudScores: user.fraudScores.map((fraudScore) => ({
				score: fraudScore.score,
				result: fraudScore.result,
			})),
		};

		return userProfile;
	}

	async findAll(): Promise<IUserProfile[]> {
		const users = await this.connection.findMany({
			include: {
				profile: true,
				transactions: {
					select: {
						id: true,
					},
				},
				fraudScores: true,
				payouts: true,
				paymentMethod: true,
			},
		});

		return users.map((user) => ({
			id: user.id,
			firstName: user.firstName,
			lastName: user.lastName,
			email: user.email,
			type: user.type,
			status: user.status,
			countryCode: user.countryCode,
			profile: user.profile
				? {
						role: user.profile.role,
						nickname: user.profile.nickname,
						phoneNumber: user.profile.phoneNumber,
						address: user.profile.address,
						lastLogin: user.profile.lastLogin,
						phoneVerified: user.profile.phoneVerified,
						emailVerified: user.profile.emailVerified,
					}
				: null,
			paymentMethod: user.paymentMethod.map((pm) => ({
				id: pm.id,
				name: pm.name,
				paymentId: pm.paymentId,
				institution: pm.institution,
			})),
			transactionsCount: user.transactions.length,
			fraudScores: user.fraudScores.map((fraudScore) => ({
				score: fraudScore.score,
				result: fraudScore.result,
			})),
		}));
	}
}
