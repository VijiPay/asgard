import bcrypt from "bcryptjs";
import { injectable } from "tsyringe";

@injectable()
export class EncryptPasswordUsecase {
  async execute(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }
}
