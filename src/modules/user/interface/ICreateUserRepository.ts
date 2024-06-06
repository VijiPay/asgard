import type  UserEntity  from '../entities/User.entity';

export interface ICreateUserRepository {
  save(user: Partial<UserEntity>): Promise<UserEntity>;
}