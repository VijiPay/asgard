import { AbstractUserService } from '#abstracts//abstract_user_service';
import { CreateUserData, UpdateUserData } from '#interface/i_user_service';
import User from '#models/user';
import { UserRepository } from '#repositories/user_repository';
import { CustomException } from '#shared/exceptions/CustomException';
import { inject } from '@adonisjs/core';

@inject()
export class UserService extends AbstractUserService {

    constructor(private userRepository: UserRepository){
        super()
    }

  async create(data: CreateUserData): Promise<User> {
    const user = await this.userRepository.create(data)
    return user
  }

  async delete(userId: number): Promise<void> {
   await this.userRepository.delete(userId)
  }

  async update(userId: number, data: UpdateUserData): Promise<User> {
    const user = await this.userRepository.update(userId, data)
    return user
  }

  async changePassword(userId: number, newPassword: string): Promise<User> {
    let user = await this.userRepository.findById(userId)
    if(!user){
        throw new CustomException(`User with id ${userId} not found`, 404)
    }
    user.password = newPassword
    await user.save()
    return user
  }

  async getById(userId: number): Promise<User> {
    return await User.findOrFail(userId)
  }

  async getByEmail(email: string): Promise<User> {
      return await User.findByOrFail({email})
  }

  async getByAuthProvider(provider: string): Promise<User> {
      return await User.findByOrFail({provider})
  }

  async getAll(): Promise<User[]> {
    return await User.all()
  }

  async lockUser(userId: number, reason: string, lockingUserId: number): Promise<User> {
    const user = this.userRepository.lockUser(userId,reason,lockingUserId)
    return user
  }

  async unlockUser(userId: number): Promise<User> {
    const user = this.userRepository.unlockUser(userId)
    return user
  }
}
