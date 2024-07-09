import { Router } from "express";
import { container } from "tsyringe";
import { CreateUserController } from "../modules/user/controllers/CreateUserController";
import { CreateUserDTO } from "../modules/user/dtos/CreateUserDTO";
import { ValidateBody } from "../shared/middleware/ValidateBody";

const router = Router();
const userController = container.resolve(CreateUserController);

router.post("/register", ValidateBody(CreateUserDTO), (req, res) =>
  userController.registerUser(req, res),
);

router.get("/user", (req, res) => {
  res.status(201).send("get users");
});

export default router;
