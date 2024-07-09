// import { describe, expect, it, vi } from "vitest";
// import { CreateUserController } from "./CreateUserController";
// import { before } from "node:test";

// describe("Create New User", () => {
//   before
// 	it("should create a new user", async () => {

// 		const createUserUseCase = {
// 			execute: vi.fn().mockResolvedValue(userCreate),
// 		} as unknown as CreateUser;
// 		const req = {
// 			body: userCreate,
// 		} as unknown as Request;
// 		const res = {
// 			status: vi.fn().mockReturnThis(),
// 			json: vi.fn(),
// 		} as unknown as Response;

// 		const createUserController = new CreateUserController(createUserUseCase);
// 		await createUserController.register(req, res);

// 		expect(createUserUseCase.execute).toHaveBeenCalledWith(req.body);
// 		expect(res.status).toHaveBeenCalledWith(201);
// 		expect(res.json).toHaveBeenCalledWith(userCreate);
// 	});
// });
