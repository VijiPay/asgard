import "reflect-metadata";
import "./registerServices";
import "./strategies/passportConfig";

import { container } from "tsyringe";
import { registerRepositories } from "./registerRepositories";
import { server } from "./server";
import { Components } from "./shared/constants/Components";
import { Config } from "./shared/services/config/Config";
import type { ILogger } from "./shared/services/logger/ILogger";
import { PassportStrategies } from "./strategies/passportStrategies";

const logger: ILogger = container.resolve(Components.Logger);
const config = container.resolve(Config);

registerRepositories(logger)
	.then(() => {
		container.resolve(PassportStrategies);
	})
	.catch((err: Error) => {
		logger.error("registerRepositories.failed", { err });
	});

server.listen(config.get<number>("PORT"), () => {
	logger.info("server.running");
});
