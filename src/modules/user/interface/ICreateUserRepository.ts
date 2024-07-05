import type { UserEntity } from "../entities/User.entity";

export interface ICreateUserRepository {
  create(user: Partial<UserEntity>): Promise<UserEntity>;
}
