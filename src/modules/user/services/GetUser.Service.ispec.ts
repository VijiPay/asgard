import "reflect-metadata";
import { container } from "tsyringe";
import { beforeAll, beforeEach, describe, expect, test, vi } from "vitest";
import { UserComponents } from "../constants/UserComponents";
import type { IGetUserService } from "../interface/IGetUserService";
import type { IUserProfile } from "../interface/IUserProfile";
import { GetUserService } from "../services/GetUser.Service";

describe("User Service", () => {
	const mockGetUserUsecase = {
		find: vi.fn(),
		findByEmail: vi.fn(),
		findById: vi.fn(),
	};
	const user: IUserProfile = {
		id: 1,
		email: "test@mainModule.com",
		firstName: "Shemang",
		lastName: "David",
		type: "individual",
		status: 0,
		countryCode: "NG",
	};
	let userService: IGetUserService;
	beforeAll(() => {
		container.registerInstance(
			UserComponents.GetUserRepository,
			mockGetUserUsecase,
		);
	});
	beforeEach(async () => {
		vi.clearAllMocks();
		userService = container.resolve(GetUserService);
	});

	test("should return user if id or email is provided", async () => {
		mockGetUserUsecase.find.mockResolvedValue(user);
		//what happens in a case where both email and Id are provided and both have different users?
		// why is it having undefined here?
		const result = await userService.find(1);
		expect(result).toEqual(user);
		expect(mockGetUserUsecase.find).toHaveBeenCalledWith(1, undefined);
	});

	test("should return user by email", async () => {
		mockGetUserUsecase.findByEmail.mockResolvedValue(user);

		const result = await userService.findByEmail("test@example.com");

		expect(result).toEqual(user);
		expect(mockGetUserUsecase.findByEmail).toHaveBeenCalledWith(
			"test@example.com",
		);
	});
	test("should return user by id", async () => {
		mockGetUserUsecase.findById.mockResolvedValue(user);

		const result = await userService.findById(1);

		expect(result).toEqual(user);
		expect(mockGetUserUsecase.findById).toHaveBeenCalledWith(1);
	});

	test("should return null if no user is found", async () => {
		mockGetUserUsecase.find.mockResolvedValue(null);

		const result = await userService.find(1);

		expect(result).toBeNull();
		expect(mockGetUserUsecase.find).toHaveBeenCalledWith(1, undefined);
	});

	test("should return null if no argument is passed to find", async () => {
		mockGetUserUsecase.find.mockResolvedValue(null);

		const result = await userService.find();

		expect(result).toBeNull();
		expect(mockGetUserUsecase.find).toHaveBeenCalledWith(undefined, undefined);
	});

	test("should throw error if both id and email are provided", async () => {
		mockGetUserUsecase.find.mockImplementation(() => {
			throw new Error("Not allowed to provide both ID and EMAIL");
		});

		await expect(userService.find(1, "test@Example.com")).rejects.toThrow(
			"Not allowed to provide both ID and EMAIL",
		);
	});
});
