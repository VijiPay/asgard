import "reflect-metadata";
import "./registerServices";

import { container } from "tsyringe";
import { registerRepositories } from "./registerRepositories";
import { server } from "./server";
import { Components } from "./shared/constants/Components";
import { Config } from "./shared/services/config/Config";
import type { ILogger } from "./shared/services/logger/ILogger";

const logger: ILogger = container.resolve(Components.Logger);
const config = container.resolve(Config);

registerRepositories(logger).catch((err: Error) => {
	logger.error("registerRepositories.failed", { err });
});

server.listen(config.get<number>("PORT"), () => {
	logger.info("server.running");
});
