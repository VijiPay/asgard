import type { PrismaClient } from "@prisma/client";
import { injectable } from "tsyringe";
import type { IDeleteUserRepository } from "../interface/IDeleteUserRepository";

@injectable()
export class DeleteUserRepository implements IDeleteUserRepository {
	connection;

	constructor(dataSource: PrismaClient) {
		this.connection = dataSource;
	}

	async delete(userId: number): Promise<void> {
		// Delete related records
		await this.connection.transaction.deleteMany({
			where: {
				userId: userId,
			},
		});
		await this.connection.payment.deleteMany({
			where: {
				userId: userId,
			},
		});
		await this.connection.fraudScore.deleteMany({
			where: {
				userId: userId,
			},
		});
		await this.connection.payout.deleteMany({
			where: {
				userId: userId,
			},
		});
		await this.connection.paymentMethod.deleteMany({
			where: {
				userId: userId,
			},
		});
		await this.connection.marketplaceItem.deleteMany({
			where: {
				userId: userId,
			},
		});
		await this.connection.profile.deleteMany({
			where: {
				userId: userId,
			},
		});
		await this.connection.apiKey.deleteMany({
			where: {
				userId: userId,
			},
		});
		// Finally, delete the user
		await this.connection.user.delete({
			where: {
				id: userId,
			},
		});
	}

	async deleteAll(): Promise<void> {
		// Delete related records first
		await this.connection.transaction.deleteMany({});
		await this.connection.payment.deleteMany({});
		await this.connection.fraudScore.deleteMany({});
		await this.connection.payout.deleteMany({});
		await this.connection.paymentMethod.deleteMany({});
		await this.connection.marketplaceItem.deleteMany({});
		await this.connection.profile.deleteMany({});
		await this.connection.apiKey.deleteMany({});
		// Finally, delete all users
		await this.connection.user.deleteMany({});
	}
}
