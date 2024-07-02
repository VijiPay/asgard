import "reflect-metadata";
import express from "express";
import morgan from "morgan";
import { container } from "tsyringe";
import { CreateUserController } from "./modules/user/controllers/CreateUserController";
import errorHandler from "./shared/middleware/error.handler";
import "./config/containers";

//routes
// import userRouter from "./routes/userRoutes";

const app = express();
app.use(express.json());
// app.use("/api/v1/user", userRouter);

app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.json({ message: "Hello, worldlyvv!" });
});

const createUserController = container.resolve(CreateUserController);
app.post("/users", createUserController.createUser.bind(createUserController));

app.use((err, res) => {
  errorHandler(err, res);
});

export default app;
