import { container } from "tsyringe";
import { dataSource } from "./database/dataSource";
import { AuthComponents } from "./modules/auth/constants/AuthComponents";
import type { IAuthRepository } from "./modules/auth/interfaces/IAuthRepository";
import { AuthRepository } from "./modules/auth/repositories/AuthRepository";
import { registerUserRepositories } from "./modules/user/registerUserRepositories";
import type { ILogger } from "./shared/services/logger/ILogger";

export const registerRepositories = async (logger?: ILogger) => {
	await dataSource
		.$connect()
		.catch(() => logger?.error("db.connection.failed"));

	logger?.info("db.connection.success");
	container.register<IAuthRepository>(AuthComponents.AuthRepository, {
		useValue: new AuthRepository(dataSource),
	});

	await registerUserRepositories(dataSource);

	return dataSource;
};
