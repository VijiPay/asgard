import express, { json, urlencoded } from "express";
import morgan from "morgan";
import errorHandler from "./shared/middleware/error.handler";

const app = express();
app.use(urlencoded({ extended: true }));
app.use(json());

app.use(morgan("dev"));

app.get("/", (_, res) => {
  res.json({ message: "Hello, åsgårdiån!" });
});

app.use((err, res) => {
  errorHandler(err, res);
});

export default app;
