import "reflect-metadata";
import { describe, expect, it, vi } from "vitest";
import UserEntity from "../entities/User.entity";
import type { ICreateUserRepository } from "../interface/ICreateUserRepository";
import type { IUserCreate } from "../interface/IUserCreate.interface";
import { CreateUser } from "./CreateUser.usecase";

describe("CreateUser Use Case", () => {
  it("should call the create method with valid data", async () => {
    const userRepository: ICreateUserRepository = {
      create: vi
        .fn()
        .mockResolvedValue(
          new UserEntity(
            "test@email.com",
            "password123",
            "john",
            "doe",
            "individual",
          ),
        ),
    };

    const createUser = new CreateUser(userRepository);
    const user: IUserCreate = {
      email: "test@email.com",
      password: "password123",
      firstName: "john",
      lastName: "doe",
      type: "individual",
    };
    const result = await createUser.execute(user);
    expect(userRepository.create).toHaveBeenCalledWith(user);
    expect(result).toBeInstanceOf(UserEntity);
    expect(result.email).toBe(user.email);
  });

  it("should handle repository errors gracefully", async () => {
    const userRepository: ICreateUserRepository = {
      create: vi.fn().mockRejectedValue(new Error("Repository error")),
    };

    const createUser = new CreateUser(userRepository);
    const user: IUserCreate = {
      email: "test@email",
      password: "password123",
      firstName: "john",
      lastName: "doe",
      type: "individual",
    };
    await expect(createUser.execute(user)).rejects.toThrow("Repository error");
  });

  it("should handle the missing required user data gracefully", async () => {
    const userRepository: ICreateUserRepository = {
      create: vi.fn(),
    };

    const createUser = new CreateUser(userRepository);
    const user: IUserCreate = {
      email: "test@email.com",
      password: "",
      firstName: "",
      lastName: "",
      type: "",
    };
    await expect(createUser.execute(user as IUserCreate)).rejects.toThrow(
      "Password is required",
    );
  });

  it("should handle invalid data format", async () => {
    const userRepository: ICreateUserRepository = {
      create: vi.fn(),
    };

    const createUser = new CreateUser(userRepository);
    const userData: IUserCreate = {
      email: "invalid-email-format",
      password: "123",
      firstName: "John",
      lastName: "Doe",
      type: "individual",
    };
    await expect(createUser.execute(userData)).rejects.toThrow(
      "Invalid email format",
    );
  });
});
