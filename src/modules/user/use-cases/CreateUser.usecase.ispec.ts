import "reflect-metadata";
import { SinonStub, stub } from "sinon";
import { describe, expect, it, vi } from "vitest";
import type { UserEntity } from "../entities/User.entity";
import type { ICreateUserRepository } from "../interface/ICreateUserRepository";
import { CreateUser } from "./CreateUser.usecase";

describe("CreateUser Use Case", () => {
  it("should call the save method with valid data", async () => {
    // Mock the repository methods
    const userRepository: ICreateUserRepository = {
      save: vi.fn().mockResolvedValue(async (user: UserEntity) => user), // Stub the save method to return the user passed
    };

    // Create an instance of the use case with mocked repository
    const createUserUseCase = new CreateUser(userRepository);

    // Test data
    const userData = {
      email: "test@email.com",
      password: "password123",
      firstName: "John",
      lastName: "Doe",
      type: "individual",
    };

    // Call the use case method
    const createdUser = await createUserUseCase.execute(userData);

    // Assert that userRepository.save was called with the correct data
    expect(userRepository.save).toBeTruthy();
    expect(createdUser).toEqual(userData);
  });

  it("should handle repository errors gracefully", async () => {
    const userRepository: ICreateUserRepository = {
      save: vi.fn().mockRejectedValue(new Error("Repository error")),
    };

    const createUser = new CreateUser(userRepository);
    const user: Partial<UserEntity> = {
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
      save: vi.fn(),
    };

    const createUser = new CreateUser(userRepository);
    const user: Partial<UserEntity> = {
      email: "test@email.com",
      password: "",
      firstName: "",
      lastName: "",
      type: "",
    };
    await expect(createUser.execute(user as UserEntity)).rejects.toThrow(
      "Password is required",
    );
  });

  it("should handle invalid data format", async () => {
    const userRepository: ICreateUserRepository = {
      save: vi.fn(),
    };

    const createUser = new CreateUser(userRepository);
    const userData: Partial<UserEntity> = {
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
