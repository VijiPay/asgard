import User from "#models/user";

export interface IUserRepository {
  create(data: Partial<User>): Promise<User>
  findById(id: number): Promise<User | null>
  findByEmail(email: string): Promise<User | null>
  findByAuthProvider(provider: string, providerId: string): Promise<User | null>
  findAll(): Promise<User[]>
  update(id: number, data: Partial<User>): Promise<User>
  delete(id: number): Promise<void>
  lockUser(id: number, reason: string, lockingUserId: number): Promise<User>
  unlockUser(id: number): Promise<User>
}
