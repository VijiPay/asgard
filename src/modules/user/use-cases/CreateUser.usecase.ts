import type User from '../entities/User.entity'
import type { ICreateUserRepository } from '../interface/ICreateUserRepository'
import type { IUserCreate } from '../interface/IUserCreate.interface'

class CreateUser {
  private userRepository: ICreateUserRepository

  constructor(userRepository: ICreateUserRepository) {
    this.userRepository = userRepository
  }
  async execute(data: IUserCreate): Promise<User> {
    this.validateInput(data);
    return await this.userRepository.save(data)
  }

  private validateInput(data: IUserCreate) {
    if (!data.email) throw new Error('Email is required')
    if (!data.password) throw new Error('Password is required')
    if (!data.firstName) throw new Error('First name is required')
    if (!data.lastName) throw new Error('Last name is required')
    if (typeof data.email !== 'string')
      throw new Error('Email must be a string')
    if (typeof data.password !== 'string')
      throw new Error('Password must be a string')
    if (typeof data.firstName !== 'string')
      throw new Error('First name must be a string')
    if (typeof data.lastName !== 'string')
      throw new Error('Last name must be a string')
  }

}

export default CreateUser
