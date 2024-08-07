import { container } from "tsyringe";

import { UserComponents } from "./constants/UserComponents";
import type { IDeleteUserService } from "./interface/IDeleteUserService";
import type { IGetUserService } from "./interface/IGetUserService";
import type { IUpdateUserService } from "./interface/IUpdateUserService";
import { DeleteUserService } from "./services/DeleteUser.service";
import { GetUserService } from "./services/GetUser.Service";
import { UpdateUserService } from "./services/UpdateUser.service";

container.register<IUpdateUserService>(UserComponents.UpdateUserService, {
	useClass: UpdateUserService,
});
container.register<IGetUserService>(UserComponents.GetUserService, {
	useClass: GetUserService,
});
container.register<IDeleteUserService>(UserComponents.DeleteUserService, {
	useClass: DeleteUserService,
});
