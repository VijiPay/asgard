import router from "@adonisjs/core/services/router";
import { middleware } from "#start/kernel";
const UserController = () => import("#controllers/user_controller");

export default function adminRoutes() {
	router
		.group(() => {
			// ::::::
			router
				.group(() => {
					router.post("/create", [UserController, "create"]);
					router.get("/", [UserController, "getAllUsers"]);
					// router.get("/:id", [UserController, "getUser"]);
					// router.put("/:id", [UserController, "update"]);
					// router.delete("/:id", [UserController, "delete"]);
					// router.put("/:id/change-password", [UserController, "changePassword"]);
				})
				.prefix("/users");
			// :::::::
			router
				.group(() => {
					router.post("/create", [UserController, "create"]);
					router.get("/", [UserController, "getAllUsers"]);
					// router.get("/:id", [UserController, "getUser"]);
					// router.put("/:id", [UserController, "update"]);
					// router.delete("/:id", [UserController, "delete"]);
					// router.put("/:id/change-password", [UserController, "changePassword"]);
				})
				.prefix("/transactions");
			// ::::::::::
		})
		.use([middleware.authorized(["admin"]), middleware.auth()])
		.prefix("admin");
}
