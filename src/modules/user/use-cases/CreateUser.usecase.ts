import { inject, singleton } from "tsyringe";
import { Components } from "../../../shared/constants/Components";
import type { CreateUserDTO } from "../dtos/CreateUserDTO";
import type { UserEntity } from "../entities/User.entity";
import type { CreateUserRepository } from "../repositories/CreateUser.repository";
import type { EncryptPasswordUsecase } from "./EncryptPassword.usecase";

@singleton()
export class CreateUserUsecase {
  constructor(
    @inject(Components.EncryptPasswordUsecase)
    private encryptPasswordUsecase: EncryptPasswordUsecase,
    @inject(Components.CreateUserRepository)
    private userRepository: CreateUserRepository,
  ) {}

  async execute(data: CreateUserDTO): Promise<UserEntity> {
    const encryptedPassword = await this.encryptPasswordUsecase.execute(
      data.password,
    );
    const uEntity = { ...data, password: encryptedPassword };
    return this.userRepository.create(uEntity);
    // Inject welcome email service here if needed
  }
}
