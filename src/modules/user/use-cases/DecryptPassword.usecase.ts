import bcrypt from "bcryptjs";
import { injectable } from "tsyringe";

@injectable()
export class DecryptPasswordUsecase {
  async execute(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
}
