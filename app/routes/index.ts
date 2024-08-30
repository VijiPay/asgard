import userRoutes from "./user_routes.js";
import authRoutes from "./auth_routes.js";

export default function registerRoutes() {
  userRoutes()
  authRoutes()
}
