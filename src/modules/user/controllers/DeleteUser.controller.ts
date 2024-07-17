import { Controller, Delete, Path, Request, Route, Tags } from "tsoa";
import { inject, injectable } from "tsyringe";
import { ResponseDTO } from "../../../shared/dtos/ResponseDTO";
import type { AuthenticatedRequest } from "../../../shared/interfaces/AuthenticatedRequest";
import { UserComponents } from "../constants/UserComponents";
import type { IDeleteUserService } from "../interface/IDeleteUserService";

@injectable()
@Tags("User Management")
@Route("ag/v1/user")
export class DeleteUserController extends Controller {
	constructor(
		@inject(UserComponents.DeleteUserService)
		private user: IDeleteUserService,
	) {
		super();
	}

	@Delete("{userId}/delete")
	async deleteUser(
		@Request() req: AuthenticatedRequest,
		@Path() userId: number,
	) {
		await this.user.delete(userId);
		return ResponseDTO.success({ message: "user.deleted" });
	}

	@Delete("/deleteAll")
	async deleteAllUsers() {
		await this.user.deleteAll();
		return ResponseDTO.success({ message: "allUsers.deleted" });
	}
}
