import db from '../../../config'
import type UserEntity from '../entities/User.entity'
import type { ICreateUserRepository } from '../interface/ICreateUserRepository'
import type { IUser } from '../interface/IUser.interface'


class CreateUserRepository implements ICreateUserRepository {
  async save(user: UserEntity): Promise<IUser> {
    return await db.user.create({
      data: {
        email: user.email,
        password: user.password,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    })
  }
}

export default CreateUserRepository
