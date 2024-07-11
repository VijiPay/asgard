import "reflect-metadata";
import "./registerServices";

import dotenv from "dotenv";
import { container } from "tsyringe";
import app from "./app";
import { registerRepositories } from "./registerRepositories";
import { Components } from "./shared/constants/Components";
import { Config } from "./shared/services/config/Config";
import type { ILogger } from "./shared/services/logger/ILogger";

dotenv.config();
const logger: ILogger = container.resolve(Components.Logger);
const config = container.resolve(Config);
const PORT = config.get<number>("PORT");

registerRepositories(logger).catch((err: Error) => {
	logger.error("failed to register Repositories", { err });
});

app.listen(PORT, () => {
	logger.info(`Server running at http://localhost:${PORT}`);
});
