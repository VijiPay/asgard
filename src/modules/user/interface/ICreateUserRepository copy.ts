import type { UserEntity } from "../entities/User.entity";

export interface ICreateUserRepository {
  save(user: Partial<UserEntity>): Promise<UserEntity>;
  getbyId(userId: number): Promise<UserEntity | null>;
  getByEmail(email: string): Promise<UserEntity | null>;
  getByPhone(phone: string): Promise<UserEntity | null>;
  update(user: Partial<UserEntity>): Promise<UserEntity>;
  delete(id: number): Promise<number>;
}
