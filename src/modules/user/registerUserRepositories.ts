import { container } from "tsyringe";

import type { PrismaClient } from "@prisma/client";
import { UserComponents } from "./constants/UserComponents";
import type { ICreateUserRepository } from "./interface/ICreateUserRepository";
import type { IDeleteUserRepository } from "./interface/IDeleteUserRepository";
import type { IGetUserRepository } from "./interface/IGetUserRepository";
import type { IUpdateUserRepository } from "./interface/IUpdateUserRepository";
import { CreateUserRepository } from "./repositories/CreateUser.repository";
import { DeleteUserRepository } from "./repositories/DeleteUser.repository";
import { GetUserRepository } from "./repositories/GetUser.repository";
import { UpdateUserRepository } from "./repositories/UpdateUser.repository";

export const registerUserRepositories = async (dataSource: PrismaClient) => {
	container.register<ICreateUserRepository>(
		UserComponents.CreateUserRepository,
		{
			useValue: new CreateUserRepository(dataSource),
		},
	);

	container.register<IGetUserRepository>(UserComponents.GetUserRepository, {
		useValue: new GetUserRepository(dataSource),
	});

	container.register<IDeleteUserRepository>(
		UserComponents.DeleteUserRepository,
		{
			useValue: new DeleteUserRepository(dataSource),
		},
	);
	container.register<IUpdateUserRepository>(
		UserComponents.UpdateUserRepository,
		{
			useValue: new UpdateUserRepository(dataSource),
		},
	);
};
