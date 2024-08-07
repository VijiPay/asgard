import {
	Controller,
	Delete,
	Middlewares,
	Path,
	Request,
	Route,
	Tags,
} from "tsoa";
import { inject, injectable } from "tsyringe";
import { ResponseDTO } from "../../../shared/dtos/ResponseDTO";
import type { AuthenticatedRequest } from "../../../shared/interfaces/AuthenticatedRequest";
import { Auth } from "../../../shared/middleware/Auth";
import { RoleGuard } from "../../../shared/middleware/RoleGuard";
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
	@Middlewares([Auth, RoleGuard(["admin"])])
	async deleteUser(
		@Request() req: AuthenticatedRequest,
		@Path() userId: number,
	) {
		await this.user.delete(userId);
		return ResponseDTO.success({ message: "user.deleted" });
	}

	@Delete("/deleteAll")
	@Middlewares([Auth, RoleGuard(["admin"])])
	async deleteAllUsers(@Request() req: AuthenticatedRequest) {
		await this.user.deleteAll();
		return ResponseDTO.success({ message: "allUsers.deleted" });
	}
}
