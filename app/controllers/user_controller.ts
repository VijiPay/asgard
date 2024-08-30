import { inject } from "@adonisjs/core";
import type { HttpContext } from "@adonisjs/core/http";
import type { UserService } from "#services/user_service";
import ResponseDTO from "#shared/dtos/response_dto";

@inject()
export default class UserController {
	constructor(private userService: UserService) {}

	public async getAllUsers() {
		const data = await this.userService.getAll();
		return ResponseDTO.success({
			message: "Users retrieved successfully",
			data,
		});
	}

	public async getUser({ params }: HttpContext) {
		const data = await this.userService.getById(params.id);
		return ResponseDTO.success({
			message: "User retrieved successfully",
			data,
		});
	}

	public async create({ request }: HttpContext) {
		console.log("creating");
		const userData = request.only([
			"email",
			"password",
			"firstName",
			"lastName",
			"countryCode",
		]);
		const data = await this.userService.create(userData);
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
		const data = await this.userService.create(userData);
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
		const data = await this.userService.update(params.id, userData);
		return ResponseDTO.success({
			message: "User updated successfully",
			data,
		});
	}

	public async delete({ params }: HttpContext) {
		await this.userService.delete(params.id);
		return ResponseDTO.success({ message: "User deleted successfully" });
	}

	public async changePassword({ params, request }: HttpContext) {
		const { newPassword } = request.only(["newPassword"]);
		const data = await this.userService.changePassword(params.id, newPassword);
		return ResponseDTO.success({
			message: "Password changed successfully",
			data,
		});
	}

	public async lockUser({ params, request }: HttpContext) {
		const { reason, lockingUserId } = request.only(["reason", "lockingUserId"]);
		const data = await this.userService.lockUser(
			params.id,
			reason,
			lockingUserId,
		);
		return ResponseDTO.success({ message: "User locked successfully", data });
	}

	public async unlockUser({ params }: HttpContext) {
		const data = await this.userService.unlockUser(params.id);
		return ResponseDTO.success({ message: "User unlocked successfully", data });
	}
}
