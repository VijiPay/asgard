import { inject, singleton } from "tsyringe";
import type { UserEntity } from "../entities/User.entity";
import type { ICreateUserRepository } from "../interface/ICreateUserRepository";
import createUserSchema, { YupError } from "../validators/userCreateSchema";

@singleton()
export class CreateUserUsecase {
  constructor(
    @inject("ICreateUserRepository")
    private userRepository: ICreateUserRepository,
  ) {}

  async execute(data: Partial<UserEntity>): Promise<UserEntity> {
    await this.validateInput(data);
    const result = await this.userRepository.create(data);
    console.log(result);
    // Inject welcome email service here if needed
    return result;
  }

  private async validateInput(data: Partial<UserEntity>) {
    try {
      await createUserSchema.validate(data, { abortEarly: false });
    } catch (err) {
      if (err instanceof YupError) {
        throw new Error(err.errors[0]);
      }
      throw err;
    }
  }
}
