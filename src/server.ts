import "express-async-errors";
import cors from "cors";
import express, { json, urlencoded } from "express";
import helmet from "helmet";
import swaggerUi from "swagger-ui-express";
import { RegisterRoutes } from "./routes";
import { errorMiddleware } from "./shared/middleware/error.handler";
import doc from "./swagger.json";

// import dotenv from "dotenv";
// dotenv.config();

export const server = express();

server.use(cors());
server.use(helmet());
server.use(urlencoded({ extended: true }));
server.use(json());

RegisterRoutes(server);

server.use("/ag/docs", swaggerUi.serve);
server.get("/ag/docs", swaggerUi.setup(doc));

server.get("/", (_, res) => {
	res.json({ message: "Hello, åsgårdiån." });
});
server.use(errorMiddleware);
