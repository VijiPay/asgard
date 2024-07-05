import express, { json, urlencoded } from "express";
import morgan from "morgan";

const app = express();
app.use(urlencoded({ extended: true }));
app.use(json());

app.use(morgan("dev"));

app.get("/", (_, res) => {
  res.json({ message: "Hello, åsgårdiån!" });
});

export default app;
