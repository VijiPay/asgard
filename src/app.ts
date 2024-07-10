import express, { json, urlencoded } from "express";
import morgan from "morgan";
import { container } from "tsyringe";
import { Components } from "./shared/constants/Components";
import Config from "./shared/services/config/Config";
import type { ILogger } from "./shared/services/logger/ILogger";

const configService = container.resolve(Config);
const ENV = configService.get<string>("ENV") as string;
const logger: ILogger = container.resolve(Components.Logger);

const app = express();
app.use(urlencoded({ extended: true }));
app.use(json());



app.use(morgan("dev"));

app.get("/", (_, res) => {
	res.json({ message: "Hello, åsgårdiån!" });
});

export default app;
