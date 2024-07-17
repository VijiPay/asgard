import { container } from "tsyringe";

import { UserComponents } from "./constants/UserComponents";
import { CreateUserService } from "./services/CreateUser.service";
import { DeleteUserService } from "./services/DeleteUser.service";
import { GetUserService } from "./services/GetUser.Service";
import { UpdateUserService } from "./services/UpdateUser.service";
import { DecryptPasswordUsecase } from "./use-cases/DecryptPassword.usecase";
import { EncryptPasswordUsecase } from "./use-cases/EncryptPassword.usecase";

container.register(UserComponents.CreateUserService, {
	useClass: CreateUserService,
});
container.register<EncryptPasswordUsecase>(
	UserComponents.EncryptPasswordUsecase,
	{
		useClass: EncryptPasswordUsecase,
	},
);
container.register<DecryptPasswordUsecase>(
	UserComponents.DecryptPasswordUsecase,
	{
		useClass: DecryptPasswordUsecase,
	},
);
container.register<UpdateUserService>(UserComponents.UpdateUserService, {
	useClass: UpdateUserService,
});
container.register<GetUserService>(UserComponents.GetUserService, {
	useClass: GetUserService,
});
container.register<DeleteUserService>(UserComponents.DeleteUserService, {
	useClass: DeleteUserService,
});
