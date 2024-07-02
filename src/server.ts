import "reflect-metadata";
import { container } from "tsyringe";
import app from "./app";
import Config from "./shared/services/config/Config";
const config = container.resolve(Config);

app.listen(config.get<number>("PORT"), () => {
  console.log(
    `Server running at http://localhost:${config.get<number>("PORT")}`,
  );
});
