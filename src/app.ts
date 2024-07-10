import express, { json, urlencoded } from "express";
import morgan from "morgan";
import swaggerUI from "swagger-ui-express";
import { container } from "tsyringe";
import { RegisterRoutes } from "./routes";
import { Components } from "./shared/constants/Components";
import Config from "./shared/services/config/Config";
import type { ILogger } from "./shared/services/logger/ILogger";
import doc from "./swagger.json";

const configService = container.resolve(Config);
const ENV = configService.get<string>("ENV") as string;
const logger: ILogger = container.resolve(Components.Logger);

const app = express();
app.use(urlencoded({ extended: true }));
app.use(json());

RegisterRoutes(app);
app.use("asgard/docs", swaggerUI.serve, swaggerUI.setup(doc));

app.use(morgan("dev"));

app.get("/", (_, res) => {
	res.json({ message: "Hello, åsgårdiån!" });
});

export default app;
