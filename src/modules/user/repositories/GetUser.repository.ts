import { singleton } from "tsyringe";
import type { DataSource } from "typeorm";
import { UserEntity } from "../entities/User.entity";
import type { IGetUserRepository } from "../interface/IGetUserRepository";
import type { IUserProfile } from "../interface/IUserProfile";
import { mapUserEntityToUserProfile } from "../mappers/UserEntityToUserProfile.mapper";

@singleton()
export class GetUserRepository implements IGetUserRepository {
	private connection;

	constructor(dataSource: DataSource) {
		this.connection = dataSource.getRepository(UserEntity);
	}

	async findByEmail(email: string): Promise<IUserProfile  | null> {
		const user = await this.connection.findOne({ where: { email } });
		return mapUserEntityToUserProfile(user);
	}

	async findById(id: number): Promise<IUserProfile | null> {
		const user = await this.connection.findOne({ where: { id } });
		return mapUserEntityToUserProfile(user);
	}
}
