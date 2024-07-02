import { inject, injectable } from "tsyringe"
import type { IPrismaClient } from "../../../shared/interfaces/IPrismaClient"
import type UserEntity from "../entities/User.entity"
import type { ICreateUserRepository } from "../interface/ICreateUserRepository"

@injectable()
export class CreateUserRepository implements ICreateUserRepository {
  constructor(@inject('IPrismaClient') private db: IPrismaClient) {
  }
  async create(user: UserEntity): Promise<UserEntity> {
    return await this.db.user.create({ data: user })
  }
}
