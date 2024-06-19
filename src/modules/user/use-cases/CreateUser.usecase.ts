import type User from '../entities/User.entity'
import type { ICreateUserRepository } from '../interface/ICreateUserRepository'
import type { IUserCreate } from '../interface/IUserCreate.interface'
import createUserSchema, { YupError } from '../validators/userCreateSchema'

class CreateUser {
  private userRepository: ICreateUserRepository

  constructor(userRepository: ICreateUserRepository) {
    this.userRepository = userRepository
  }

  async execute(data: IUserCreate): Promise<User> {
    await this.validateInput(data)
    const result = await this.userRepository.create(data)
    // Inject welcome email service here if needed
    return result
  }

  private async validateInput(data: IUserCreate) {
    try {
      await createUserSchema.validate(data, { abortEarly: false })
    } catch (err) {
      if (err instanceof YupError) {
        throw new Error(err.errors[0])
      }
      throw err
    }
  }
}

export default CreateUser
