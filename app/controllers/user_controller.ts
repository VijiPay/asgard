import { inject } from "@adonisjs/core";
import type { HttpContext } from "@adonisjs/core/http";
import { UserRepository } from "#repositories/user_repository";
import { UserService } from "#services/user_service";
// import type { UserService } from "#services/user_service";
import ResponseDTO from "#shared/dtos/response_dto";

const uService = new UserService(new UserRepository());

@inject()
export default class UserController {
	uService;
	constructor() {
		this.uService = uService;
	}
	// constructor(protected uService: UserService) {}

	public async getAllUsers() {
		// const data = await this.uService.getAll();
		return ResponseDTO.success({
			message: "Users retrieved successfully",
			// data,
		});
	}

	public async getUser({ params }: HttpContext) {
		const data = await this.uService.getById(params.id);
		return ResponseDTO.success({
			message: "User retrieved successfully",
			data,
		});
	}

	public async create({ request }: HttpContext) {
		console.log("time to create user in controller");
		console.log("creating");
		const userData = request.only([
			"email",
			"password",
			"firstName",
			"lastName",
			"countryCode",
		]);
		const data = await this.uService.create(userData);
		return ResponseDTO.success({
			message: "User created successfully",
			data,
		});
	}

	public async oauthSignUp({ request }: HttpContext) {
		const userData = request.only([
			"email",
			"firstName",
			"lastName",
			"countryCode",
			"googleId",
			"facebookId",
			"loginIp",
		]);
		const data = await this.uService.create(userData);
		return ResponseDTO.success({
			message: "User registered successfully",
			data,
		});
	}

	public async update({ params, request }: HttpContext) {
		const userData = request.only([
			"email",
			"firstName",
			"lastName",
			"countryCode",
		]);
		const data = await this.uService.update(params.id, userData);
		return ResponseDTO.success({
			message: "User updated successfully",
			data,
		});
	}

	public async delete({ params }: HttpContext) {
		await this.uService.delete(params.id);
		return ResponseDTO.success({ message: "User deleted successfully" });
	}

	public async changePassword({ params, request }: HttpContext) {
		const { newPassword } = request.only(["newPassword"]);
		const data = await this.uService.changePassword(params.id, newPassword);
		return ResponseDTO.success({
			message: "Password changed successfully",
			data,
		});
	}

	public async lockUser({ params, request }: HttpContext) {
		const { reason, lockingUserId } = request.only(["reason", "lockingUserId"]);
		const data = await this.uService.lockUser(params.id, reason, lockingUserId);
		return ResponseDTO.success({ message: "User locked successfully", data });
	}

	public async unlockUser({ params }: HttpContext) {
		const data = await this.uService.unlockUser(params.id);
		return ResponseDTO.success({ message: "User unlocked successfully", data });
	}
}
