import cors from "cors";
import express, { json, urlencoded } from "express";
import morgan from "morgan";
import swaggerUI from "swagger-ui-express";
import { RegisterRoutes } from "./routes";
import { errorMiddleware } from "./shared/middleware/error.handler";
import doc from "./swagger.json";

const app = express();
app.use(urlencoded({ extended: true }));
app.use(json());
app.use(cors());

RegisterRoutes(app);
app.use("/ag/docs", swaggerUI.serve, swaggerUI.setup(doc));

app.use(morgan("dev"));

app.get("/", (_, res) => {
	res.json({ message: "Hello, åsgårdiån!" });
});
app.use(errorMiddleware);

export default app;
