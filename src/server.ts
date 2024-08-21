import "express-async-errors";
import cookieParser from "cookie-parser";
import cors from "cors";
import express, { json, urlencoded } from "express";
import session from "express-session";
import helmet from "helmet";
import passport from "passport";
import swaggerUi from "swagger-ui-express";
import { container } from "tsyringe";
import { RegisterRoutes } from "./routes";
import { errorMiddleware } from "./shared/middleware/error.handler";
import { Config } from "./shared/services/config/Config";
import doc from "./swagger.json";

export const server = express();
const config = container.resolve(Config);

server.use(cors());
server.use(helmet());
server.use(urlencoded({ extended: true }));
server.use(json());
server.use(cookieParser());
server.use(
	session({
		secret: config.defined<string>("SECRET"),
		resave: false,
		saveUninitialized: false,
	}),
);

server.use(passport.initialize());
server.use(passport.session());

RegisterRoutes(server);

server.use("/ag/docs", swaggerUi.serve);
server.get("/ag/docs", swaggerUi.setup(doc));

server.get("/", (_, res) => {
	res.json({ message: "Hello, åsgårdiån!" });
});
server.use(errorMiddleware);
