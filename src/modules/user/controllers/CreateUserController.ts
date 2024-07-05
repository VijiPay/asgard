import type { Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import { Components } from "../../../shared/constants/Components";
import type { CreateUserDTO } from "../dtos/CreateUserDTO";
import type { IAuthService } from "../interface/IAuthService";

@injectable()
export class CreateUserController {
  constructor(
    @inject(Components.AuthService) private authService: IAuthService,
  ) {}

  async registerUser(req: Request, res: Response): Promise<void> {
    try {
      const userData: CreateUserDTO = req.body;
      const newUser = await this.authService.register(userData);
      res.status(201).json({ success: "Successful", email: newUser.email });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
