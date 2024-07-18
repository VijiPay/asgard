import type { PrismaClient } from "@prisma/client";
import { injectable } from "tsyringe";
import type { IDeleteUserRepository } from "../interface/IDeleteUserRepository";

@injectable()
export class DeleteUserRepository implements IDeleteUserRepository {
	private connection;

	constructor(dataSource: PrismaClient) {
		this.connection = dataSource;
	}

	async delete(userId: number): Promise<void> {
		// Delete related records
		await this.connection.$transaction(async (prisma) => {
			// Deleting related transactions
			await prisma.transaction.deleteMany({
				where: {
					OR: [{ initiatorId: userId }, { receiverId: userId }],
				},
			});

			// Deleting other related records
			await prisma.payment.deleteMany({ where: { userId } });
			await prisma.fraudScore.deleteMany({ where: { userId } });
			await prisma.payout.deleteMany({ where: { userId } });
			await prisma.paymentMethod.deleteMany({ where: { userId } });
			await prisma.profile.deleteMany({ where: { userId } });
			await prisma.apiKey.deleteMany({ where: { userId } });
			await prisma.businessAssociate.deleteMany({ where: { userId } });

			// Delete Business if user is associated with one
			const business = await prisma.business.findUnique({ where: { userId } });
			if (business) {
				await prisma.business.delete({ where: { userId } });
			}

			// Finally, delete the user
			await prisma.user.delete({ where: { id: userId } });
		});
	}

	async deleteAll(): Promise<void> {
		await this.connection.$transaction(async (prisma) => {
			// Deleting all related records first
			await prisma.transaction.deleteMany({});
			await prisma.payment.deleteMany({});
			await prisma.fraudScore.deleteMany({});
			await prisma.payout.deleteMany({});
			await prisma.paymentMethod.deleteMany({});
			await prisma.profile.deleteMany({});
			await prisma.apiKey.deleteMany({});
			await prisma.businessAssociate.deleteMany({});
			await prisma.business.deleteMany({});

			// Finally, delete all users
			await prisma.user.deleteMany({});
		});
	}
}
