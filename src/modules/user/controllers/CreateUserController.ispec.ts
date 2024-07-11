import "reflect-metadata";
import { container } from "tsyringe";
import { beforeAll, describe, expect, test, vi } from "vitest";
import { Components } from "../../../shared/constants/Components";
import { ResponseDTO } from "../../../shared/dtos/ResponseDTO";
import type { CreateUserDTO } from "../dtos/CreateUserDTO";
import type { IAuthService } from "../interface/IAuthService";
import { CreateUserController } from "./CreateUser.controller";

describe("CreateUserController", () => {
	const mockAuthService = {
		register: vi.fn(),
	} as unknown as IAuthService;

	let controller: CreateUserController;

	beforeAll(() => {
		container.registerInstance(Components.AuthService, mockAuthService);
		controller = new CreateUserController(
			container.resolve(Components.AuthService),
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
