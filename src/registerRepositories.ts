import dataSource from "./database/dataSource";
import { registerAuthRepositories } from "./modules/auth/registerAuthRepositories";
import { registerUserRepositories } from "./modules/user/registerUserRepositories";
import type { ILogger } from "./shared/services/logger/ILogger";

export const registerRepositories = async (logger?: ILogger) => {
	await dataSource
		.$connect()
		.catch(() => logger?.error("db.connection.failed"));

	logger?.info("db.connection.success");

	await registerUserRepositories(dataSource);
	await registerAuthRepositories(dataSource);

	return dataSource;
};
