import "reflect-metadata";
import { container } from "tsyringe";
import { CreateUserController } from "../modules/user/controllers/CreateUserController";
import type { ICreateUserRepository } from "../modules/user/interface/ICreateUserRepository";
import { CreateUserRepository } from "../modules/user/repositories/CreateUser.repository";
import { CreateUser } from "../modules/user/use-cases/CreateUser.usecase";
import type { IPrismaClient } from "../shared/interfaces/IPrismaClient";
import prisma from "./prismaClient";

// Register the PrismaClient instance with useValue
container.register<IPrismaClient>("IPrismaClient", {
  useValue: prisma,
});

// Register the repository
container.register<ICreateUserRepository>("ICreateUserRepository", {
  useClass: CreateUserRepository,
});

// Register the use case
container.register("CreateUser", CreateUser);

// Register the controller
container.register("CreateUserController", CreateUserController);
