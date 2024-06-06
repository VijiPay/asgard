import type User from '../entities/User.entity'
import  type {ICreateUserRepository}  from '../interface/ICreateUserRepository'
import type { IUser } from '../interface/IUser.interface'



class CreateUser {
  private userRepository: ICreateUserRepository

  constructor(userRepository: ICreateUserRepository) {
    this.userRepository = userRepository
  }
  async execute(data: IUser): Promise<User> {
    return await this.userRepository.save(data)
  }
}

export default CreateUser
