import type User from '../../modules/user/entities/User.entity'
import type { IUserCreate } from '../../modules/user/interface/IUserCreate.interface'

export interface IPrismaClient {
  user: {
    create(data: { data: IUserCreate }): Promise<User>
  }
}
