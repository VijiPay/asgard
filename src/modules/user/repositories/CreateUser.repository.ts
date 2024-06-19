import db from '../../../config'
import type UserEntity from '../entities/User.entity'
import type { ICreateUserRepository } from '../interface/ICreateUserRepository'
import type { IUser } from '../interface/IUser.interface'


class CreateUserRepository implements ICreateUserRepository {
  async create(user: UserEntity): Promise<IUser> {
    return await db.user.create({
      data: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
      },
    })
  }
}

export default CreateUserRepository
