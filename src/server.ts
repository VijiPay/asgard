import "reflect-metadata";
import "./registerServices";

import { container } from "tsyringe";
import app from "./app";
import { registerRepositories } from "./registerRepositories";
import { Components } from "./shared/constants/Components";
import Config from "./shared/services/config/Config";
import type { ILogger } from "./shared/services/logger/ILogger";

const logger: ILogger = container.resolve(Components.Logger);
const config = container.resolve(Config);

registerRepositories(logger).catch((err: Error) => {
  logger.error("failed to register Repositories", { err });
});

app.listen(config.get<number>("PORT", 4343), () => {
  logger.info(
    `Server running at http://localhost:${config.get<number>("PORT")}`,
  );
});
