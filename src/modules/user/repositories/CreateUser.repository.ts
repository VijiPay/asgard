import { injectable } from "tsyringe";
import type { DataSource } from "typeorm";
import { UserEntity } from "../entities/User.entity";
import type { ICreateUserRepository } from "../interface/ICreateUserRepository";

@injectable()
export class CreateUserRepository implements ICreateUserRepository {
  private connection;

  constructor(dataSource: DataSource) {
    this.connection = dataSource.getRepository(UserEntity);
  }

  async create(data: Partial<UserEntity>): Promise<UserEntity> {
    return this.connection.save(data);
  }
}
