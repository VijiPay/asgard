import { Controller, Patch, Path, Request, Route, Tags } from "tsoa";
import { inject, injectable } from "tsyringe";
import { ResponseDTO } from "../../../shared/dtos/ResponseDTO";
import type { AuthenticatedRequest } from "../../../shared/interfaces/AuthenticatedRequest";
import { UserComponents } from "../constants/UserComponents";
import type { IUpdateUserService } from "../interface/IUpdateUserService";

@injectable()
@Tags("User Management")
@Route("ag/v1/user")
export class UpdateUserController extends Controller {
	constructor(
		@inject(UserComponents.UpdateUserService)
		private user: IUpdateUserService,
	) {
		super();
	}

	@Patch("{userId}/disable")
	async disableUser(
		@Request() req: AuthenticatedRequest,
		@Path() userId: number,
	) {
		await this.user.disable(userId);
		return ResponseDTO.success({ message: "user.disabled" });
	}
}
