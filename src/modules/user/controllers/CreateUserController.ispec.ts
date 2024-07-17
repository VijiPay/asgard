import "reflect-metadata";
import { container } from "tsyringe";
import { beforeAll, describe, expect, test, vi } from "vitest";
import { ResponseDTO } from "../../../shared/dtos/ResponseDTO";
import { UserComponents } from "../constants/UserComponents";
import type { CreateUserDTO } from "../dtos/CreateUserDTO";
import type { ICreateUserService } from "../interface/ICreateUserService";
import { CreateUserController } from "./CreateUser.controller";

describe("CreateUserController", () => {
	const mockAuthService = {
		register: vi.fn(),
	} as unknown as ICreateUserService;

	let controller: CreateUserController;

	beforeAll(() => {
		container.registerInstance(
			UserComponents.CreateUserService,
			mockAuthService,
		);
		controller = new CreateUserController(
			container.resolve(UserComponents.CreateUserService),
		);
	});

	test("should register a user successfully", async () => {
		const createUserDto: CreateUserDTO = {
			firstName: "John",
			lastName: "Doe",
			email: "john.doe@example.com",
			password: "password123",
			type: "individual",
			status: 0,
			countryCode: "NG",
		};

		mockAuthService.register(createUserDto);

		const result = await controller.register(createUserDto);

		expect(mockAuthService.register).toHaveBeenCalledWith(createUserDto);
		expect(result).toEqual(ResponseDTO.success({ message: "successful" }));
	});
});
