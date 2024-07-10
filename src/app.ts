import express, { json, urlencoded } from "express";
import morgan from "morgan";
import swaggerUI from "swagger-ui-express";
import { RegisterRoutes } from "./routes";
import doc from "./swagger.json";

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
