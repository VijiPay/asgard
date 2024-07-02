import type { Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import type { CreateUser } from "../use-cases/CreateUser.usecase";

@injectable()
export class CreateUserController {
  constructor(@inject("CreateUser") private createUserUseCase: CreateUser) {}

  async createUser(req: Request, res: Response): Promise<void> {
    try {
      const user = await this.createUserUseCase.execute(req.body);
      res.status(201).json(user);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(400).json({ error: "Unknown error occured" });
      }
    }
  }
}
